import { loadConfig } from 'unconfig'

export const DEFAULT_CONFIG_NAME = 'tws.config' as const
export const DEFAULT_TAILWIND_CONFIG_NAME = 'tailwind.config' as const

export async function getConfig(configName: string, defaultConfigPath?: string) {
  const { config } = await loadConfig({
    sources: [
      {
        files: defaultConfigPath || '',
        extensions: [],
        async rewrite(config) {
          const resolved = await (typeof config === 'function' ? config() : config)
          return resolved
        },
      },
      {
        files: configName,
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json'],
        async rewrite(config) {
          const resolved = await (typeof config === 'function' ? config() : config)
          return resolved
        },
      },
    ],
    merge: true,
  })
  return config
}

export async function getTwsConfig(defaultConfigPath?: string) {
  const config = await getConfig(DEFAULT_CONFIG_NAME, defaultConfigPath)
  return config
}

export async function getTailwindConfig(defaultConfigPath?: string) {
  const config = await getConfig(DEFAULT_TAILWIND_CONFIG_NAME, defaultConfigPath)
  return config
}
