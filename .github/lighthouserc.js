const extraHeaders = {}

if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
  extraHeaders['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
}

module.exports = {
  ci: {
    collect: {
      settings: {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        ...(Object.keys(extraHeaders).length ? { extraHeaders: JSON.stringify(extraHeaders) } : {}),
        skipAudits: ['is-crawlable'],
      },
    },
  },
}
