export const defaultAppSettingsData = {
  app: '',
  ads: {
    ad_active: '', // selector
    ad_interval: 1,
    admob: {
      banner: {
        status: false,
        ad_unit: '',
      },
      interstitial: {
        status: false,
        ad_unit: '',
      },
      native: {
        status: false,
        ad_unit: '',
      },
    },
    fan: {
      banner: {
        status: false,
        ad_unit: '',
      },
      interstitial: {
        status: false,
        ad_unit: '',
      },
      native: {
        status: false,
        ad_unit: '',
      },
    },
    applovin: {
      banner: {
        status: false,
        ad_unit: '',
      },
      interstitial: {
        status: false,
        ad_unit: '',
      },
      native: {
        status: false,
        ad_unit: '',
      },
      mrec: {
        status: false,
        ad_unit: '',
      },
    },
  },
  system_ads: {
    status: false,
    title: '',
    content: '',
    image: '',
    url: '',
  },
  system_app: {
    status: false,
    title: 'Server Is Down',
    content: 'Server is down, please download the new application from us to be able to use this feature again',
    image: 'https://i.pinimg.com/originals/0f/d1/6a/0fd16a96935380b59961d43ea5234320.png',
    url: 'https://play.google.com/store/apps/details?id=com.livefootballstv.futbol.nophdyes',
  },
  app_info: {
    app_name: '',
    app_image: '',
    url_webview: '',
    url_telegram: '',
    url_discord: '',
    url_facebook: '',
    url_whatsapp: '',
  },
}

export const defaultAppBlockListSettings = {
  ip: [
    '127.0.0.1',
  ],
  country: [],
  country_code: [],
  org: [],
  asn: [],
  app: '',

}
