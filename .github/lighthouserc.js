const extraHeaders = {}

if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
  extraHeaders['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  extraHeaders['x-vercel-set-bypass-cookie'] = 'true'
}

module.exports = {
  ci: {
    collect: {
      settings: {
        ...(Object.keys(extraHeaders).length ? { extraHeaders: JSON.stringify(extraHeaders) } : {}),
        skipAudits: ['is-crawlable'],
      },
    },
  },
}
