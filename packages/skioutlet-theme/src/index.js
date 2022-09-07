import Root from "./components"
import link from "@frontity/html2react/processors/link";

const skioutletTheme = {
  name: "skioutlet-theme",
  roots: {
    theme: Root,
  },
  state: {
    theme: {},
    source: {
      data: {
        "/shop/": {
          isShop: true,
          isReady: true
        }
      },
    },  
  },
  actions: {
    theme: {},
  },
  libraries: {
    source: {
      handlers: [
        {
          pattern: "/shop/termek/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isItem: true,
              id: params.id
            }
          }
        },
        {
          pattern: "/shop/oldal/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isPagination: true,
              id: params.id
            }
          }
        },
        {
          pattern: "/shop/:id",
          func: ({ state, link, params }) => {
            state.source.data[link] = {
              isSearch: true,
              id: params.id
            }
          }
        }
      ]
    },
    html2react: {
      processors: [link]
    }
  },
}

export default skioutletTheme