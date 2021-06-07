export const homeState = {
  menuSelectKey: ['1'],
  pageTitle: '温度计',
  pageSubTitle: '温度计管理列表'
}

export const SET_MENU_SELECT_KAY = 'setMenuSelectKey'
export const SET_PAGE_TITLE = 'setPageTitle'
export const SET_PAGE_SUBTITLE = 'setPageSubTitle'

export const onChangeMenuSelectKey = key => ({
  type: SET_MENU_SELECT_KAY,
  menuSelectKey: [key]
})
export const onChangePageTitle = pageTitle => ({
  type: SET_PAGE_TITLE,
  pageTitle: pageTitle
})
export const onChangePageSubTitle = pageSubTitle => ({
  type: SET_PAGE_SUBTITLE,
  pageSubTitle: pageSubTitle
})

const homeReducer = (state = homeState, action) => {
  switch (action.type) {
    case SET_MENU_SELECT_KAY:
      const { menuSelectKey } = action
      return {
        ...state,
        menuSelectKey
      }
    case SET_PAGE_TITLE:
      const { pageTitle } = action
      return {
        ...state,
        pageTitle
      }
    case SET_PAGE_SUBTITLE:
      const { pageSubTitle } = action
      return {
        ...state,
        pageSubTitle
      }
    default: {
      return { ...state }
    }
  }
}
export { homeReducer }