export interface DataSources {
	category: string,
	country: string,
	description: string,
	id: string,
	language: string,
	name: string,
	url: string,
}

export interface SourcesConfig {
  draw(data: DataSources[]): void;
}