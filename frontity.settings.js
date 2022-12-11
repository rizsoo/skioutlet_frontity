const settings = {
  "name": "skioutlet-frontity",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Test Frontity Blog",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
    "name": "skioutlet-theme",
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://wordpress.skioutlet.hu/cms/",
          "postTypes": [
            {
              type: "shop",
              endpoint: "shop",
              archive: "/shop"
            }
          ]
        },
        "menu": [
          ["Főoldal", "/"],
          ["Termékek", "/shop/"],
          ["Rólunk", "/rolunk/"],
          ["Kapcsolat", "/kapcsolat/"],
        ],
        "products": [],
      }
    },
    // {
    //   name: "@frontity/google-analytics",
    //     state: {
    //       googleAnalytics: {
    //       trackingId: "G-5X9RQ169S6",
    //       },
    //     },
    // }, 
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
