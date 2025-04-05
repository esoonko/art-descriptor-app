import fs from 'fs';
import yaml from 'js-yaml';

interface Config {
	image_bucket_url: string;
	pages: PageConfig[];
	bigqueryConfig: BigqueryConfig;
}

interface PageConfig {
	denomination: string;
	name: string;
	image_urls: string[];
	systemprompt: string;
	prompt: string;
}

interface BigqueryConfig {
	dataset: string;
	table: string;
}

export function loadConfig(): Config {
	try {
		const file = fs.readFileSync('src/lib/config/config.yml', 'utf8');
		const config = yaml.load(file) as Config;
		return config;
	} catch (error) {
		console.error('Error loading config.yml:', error);
		throw new Error('Could not load configuration file');
	}
}
