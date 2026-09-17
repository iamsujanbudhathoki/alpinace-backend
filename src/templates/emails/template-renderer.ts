import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import { DotenvConfig } from '../../config/env.config';
import {
  formatHumanDate,
  formatHumanDateRange,
  formatHumanDateTime,
} from '../../utils/date.util';

export interface RenderOptions {
  title?: string;
  preheader?: string;
  subtitle?: string;
  footerText?: string;
  logoUrl?: string;
}

/**
 * Centrally resolves template directory path in both TS source (src) and JS build (dist) environments.
 */
function getTemplatesDirectory(): string {
  // Check if current directory contains layout.ejs directly
  if (fs.existsSync(path.join(__dirname, 'layout.ejs'))) {
    return __dirname;
  }
  
  // Fallback to project root src/templates/emails
  const srcPath = path.resolve(process.cwd(), 'src', 'templates', 'emails');
  if (fs.existsSync(path.join(srcPath, 'layout.ejs'))) {
    return srcPath;
  }

  // Fallback to project root dist/templates/emails
  const distPath = path.resolve(process.cwd(), 'dist', 'templates', 'emails');
  if (fs.existsSync(path.join(distPath, 'layout.ejs'))) {
    return distPath;
  }

  return __dirname;
}

/**
 * Render a standardized EJS email template wrapped inside the shared email layout.
 *
 * @param templateName Name of the template (e.g. 'client-inquiry' or 'auth-otp')
 * @param data Data context object passed into the template
 * @param options Layout parameters (title, preheader, subtitle, footerText, logoUrl)
 */
export async function renderEjsTemplate(
  templateName: string,
  data: Record<string, any>,
  options: RenderOptions = {},
): Promise<string> {
  const templatesDir = getTemplatesDirectory();
  const templatePath = path.join(templatesDir, `${templateName}.ejs`);
  const layoutPath = path.join(templatesDir, 'layout.ejs');

  const websiteUrl = DotenvConfig.FRONTEND_BASE_URL || 'https://alpineacetreks.com';
  const logoUrl = options.logoUrl || `${websiteUrl}/logo.jpg`;

  // Render specific template content body
  const innerBodyHtml = await ejs.renderFile(
    templatePath,
    {
      websiteUrl,
      logoUrl,
      formatHumanDate,
      formatHumanDateRange,
      formatHumanDateTime,
      ...data,
    },
    {
      root: templatesDir,
      filename: templatePath,
    },
  );

  // Wrap inside centralized layout with shared header & footer
  const fullHtml = await ejs.renderFile(
    layoutPath,
    {
      body: innerBodyHtml,
      title: options.title || 'Alpine Ace',
      preheader: options.preheader || '',
      subtitle: options.subtitle || 'Nepal Treks & Expeditions',
      footerText: options.footerText || undefined,
      logoUrl,
      websiteUrl,
    },
    {
      root: templatesDir,
      filename: layoutPath,
    },
  );

  return fullHtml;
}
