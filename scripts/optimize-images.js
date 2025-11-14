#!/usr/bin/env node

/**
 * YECO 全站图片自动优化脚本
 *
 * 功能：
 * - 自动扫描所有 pages/*\/images/ 目录
 * - 转换图片为 WebP 格式（压缩率 70-85%）
 * - 生成多种响应式尺寸
 * - 保留原图作为 fallback
 * - 生成图片清单 JSON
 *
 * 使用方式：
 * npm run optimize-images  # 优化所有图片
 * npm run optimize-images -- --path pages/reports/2025-10-middleeast  # 优化指定路径
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// ==========================================
// 配置选项
// ==========================================
const CONFIG = {
    // 支持的输入格式
    inputFormats: ['jpg', 'jpeg', 'png'],

    // WebP 质量设置
    webpQuality: 85,

    // 响应式图片尺寸配置
    responsiveSizes: {
        small: 640,    // 移动端
        medium: 1024,  // 平板
        large: 1920,   // 桌面
        // 注：如果原图小于目标尺寸，则不生成该尺寸
    },

    // 搜索路径模式
    searchPattern: 'pages/**/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',

    // 输出目录名（相对于原图目录）
    optimizedDir: 'optimized',

    // 是否保留原图
    keepOriginal: true,

    // 日志级别
    verbose: true
};

// ==========================================
// 工具函数
// ==========================================

/**
 * 日志输出
 */
function log(message, level = 'info') {
    if (!CONFIG.verbose && level === 'verbose') return;

    const prefix = {
        info: '✓',
        error: '✗',
        warn: '⚠',
        verbose: '→'
    }[level] || 'ℹ';

    console.log(`${prefix} ${message}`);
}

/**
 * 获取文件大小（人类可读格式）
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 确保目录存在
 */
async function ensureDir(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

/**
 * 获取图片元数据
 */
async function getImageInfo(imagePath) {
    try {
        const stats = await fs.stat(imagePath);
        const metadata = await sharp(imagePath).metadata();
        return {
            path: imagePath,
            size: stats.size,
            width: metadata.width,
            height: metadata.height,
            format: metadata.format
        };
    } catch (error) {
        log(`无法读取图片信息: ${imagePath} - ${error.message}`, 'error');
        return null;
    }
}

/**
 * 优化单张图片
 */
async function optimizeImage(imagePath, outputDir) {
    const info = await getImageInfo(imagePath);
    if (!info) return null;

    const basename = path.basename(imagePath, path.extname(imagePath));
    const originalSize = info.size;
    const results = {
        original: imagePath,
        optimized: [],
        savings: 0,
        error: null
    };

    try {
        // 生成 WebP 版本（多个尺寸）
        const image = sharp(imagePath);

        for (const [sizeName, targetWidth] of Object.entries(CONFIG.responsiveSizes)) {
            // 如果原图宽度小于目标宽度，跳过
            if (info.width <= targetWidth && sizeName !== 'large') {
                continue;
            }

            const outputFilename = `${basename}-${sizeName}.webp`;
            const outputPath = path.join(outputDir, outputFilename);

            // 调整尺寸并转换为 WebP
            await image
                .clone()
                .resize(targetWidth, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: CONFIG.webpQuality })
                .toFile(outputPath);

            const stats = await fs.stat(outputPath);
            results.optimized.push({
                path: outputPath,
                size: stats.size,
                width: targetWidth,
                format: 'webp'
            });

            log(`  → ${sizeName} (${targetWidth}px): ${formatFileSize(stats.size)}`, 'verbose');
        }

        // 生成一个全尺寸的 WebP 作为主要版本
        const mainOutputPath = path.join(outputDir, `${basename}.webp`);
        await sharp(imagePath)
            .webp({ quality: CONFIG.webpQuality })
            .toFile(mainOutputPath);

        const mainStats = await fs.stat(mainOutputPath);
        results.optimized.push({
            path: mainOutputPath,
            size: mainStats.size,
            width: info.width,
            format: 'webp',
            main: true
        });

        // 计算节省的空间
        const totalOptimizedSize = results.optimized.reduce((sum, item) => sum + item.size, 0);
        results.savings = originalSize - mainStats.size;
        const savingsPercent = ((results.savings / originalSize) * 100).toFixed(1);

        log(`✓ ${path.basename(imagePath)}: ${formatFileSize(originalSize)} → ${formatFileSize(mainStats.size)} (节省 ${savingsPercent}%)`, 'info');

        return results;

    } catch (error) {
        results.error = error.message;
        log(`优化失败: ${imagePath} - ${error.message}`, 'error');
        return results;
    }
}

/**
 * 处理单个图片目录
 */
async function processImageDirectory(imagesDir) {
    log(`\n处理目录: ${imagesDir}`, 'info');

    // 创建优化输出目录
    const outputDir = path.join(imagesDir, CONFIG.optimizedDir);
    await ensureDir(outputDir);

    // 查找该目录下的所有图片（不包括 optimized 子目录）
    // 使用正斜杠以确保 glob 在 Windows 上正常工作
    const pattern = path.join(imagesDir, `*.{${CONFIG.inputFormats.join(',')}}`).replace(/\\/g, '/');
    const imageFiles = await glob(pattern, { nocase: true });

    if (imageFiles.length === 0) {
        log(`  没有找到图片文件`, 'warn');
        return null;
    }

    log(`  找到 ${imageFiles.length} 个图片文件`, 'info');

    // 优化所有图片
    const results = [];
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const imagePath of imageFiles) {
        const result = await optimizeImage(imagePath, outputDir);
        if (result) {
            results.push(result);
            const info = await getImageInfo(imagePath);
            totalOriginalSize += info.size;
            const mainOptimized = result.optimized.find(o => o.main);
            if (mainOptimized) {
                totalOptimizedSize += mainOptimized.size;
            }
        }
    }

    // 生成图片清单 JSON
    const manifest = {
        generatedAt: new Date().toISOString(),
        totalImages: results.length,
        totalOriginalSize,
        totalOptimizedSize,
        totalSavings: totalOriginalSize - totalOptimizedSize,
        savingsPercent: ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1),
        images: results.map(r => ({
            original: path.relative(imagesDir, r.original),
            optimized: r.optimized.map(o => ({
                path: path.relative(imagesDir, o.path),
                size: o.size,
                width: o.width,
                main: o.main || false
            }))
        }))
    };

    const manifestPath = path.join(outputDir, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    log(`\n目录统计:`, 'info');
    log(`  原始大小: ${formatFileSize(totalOriginalSize)}`, 'info');
    log(`  优化后: ${formatFileSize(totalOptimizedSize)}`, 'info');
    log(`  节省: ${formatFileSize(totalOriginalSize - totalOptimizedSize)} (${manifest.savingsPercent}%)`, 'info');
    log(`  清单文件: ${manifestPath}`, 'info');

    return manifest;
}

/**
 * 主函数
 */
async function main() {
    console.log('🎨 YECO 图片优化工具\n');
    console.log('========================================\n');

    // 检查是否安装了 sharp
    try {
        require.resolve('sharp');
    } catch {
        log('错误: 未安装 sharp 库', 'error');
        log('请运行: npm install sharp', 'error');
        process.exit(1);
    }

    // 解析命令行参数
    const args = process.argv.slice(2);
    const pathArgIndex = args.indexOf('--path');
    const specificPath = pathArgIndex !== -1 ? args[pathArgIndex + 1] : null;

    // 确定搜索模式
    const searchPattern = specificPath
        ? path.join(specificPath, '**', 'images')
        : 'pages/**/images';

    // 查找所有图片目录
    log('扫描图片目录...', 'info');
    const imageDirectories = await glob(searchPattern, { onlyDirectories: true });

    // 过滤掉 optimized 目录
    const validDirectories = imageDirectories.filter(dir => !dir.includes('/optimized'));

    if (validDirectories.length === 0) {
        log('没有找到图片目录', 'warn');
        log(`搜索模式: ${searchPattern}`, 'warn');
        return;
    }

    log(`找到 ${validDirectories.length} 个图片目录\n`, 'info');

    // 处理每个目录
    const allManifests = [];
    let grandTotalOriginal = 0;
    let grandTotalOptimized = 0;

    for (const dir of validDirectories) {
        const manifest = await processImageDirectory(dir);
        if (manifest) {
            allManifests.push({
                directory: dir,
                ...manifest
            });
            grandTotalOriginal += manifest.totalOriginalSize;
            grandTotalOptimized += manifest.totalOptimizedSize;
        }
    }

    // 输出总体统计
    console.log('\n========================================');
    console.log('总体统计:');
    console.log(`  处理目录: ${allManifests.length}`);
    console.log(`  处理图片: ${allManifests.reduce((sum, m) => sum + m.totalImages, 0)}`);
    console.log(`  原始总大小: ${formatFileSize(grandTotalOriginal)}`);
    console.log(`  优化后: ${formatFileSize(grandTotalOptimized)}`);
    console.log(`  总节省: ${formatFileSize(grandTotalOriginal - grandTotalOptimized)} (${((grandTotalOriginal - grandTotalOptimized) / grandTotalOriginal * 100).toFixed(1)}%)`);
    console.log('========================================\n');

    log('✓ 优化完成！', 'info');
}

// 运行主函数
if (require.main === module) {
    main().catch(error => {
        log(`严重错误: ${error.message}`, 'error');
        console.error(error);
        process.exit(1);
    });
}

module.exports = { optimizeImage, processImageDirectory };
