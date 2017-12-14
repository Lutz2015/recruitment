let getOriginMenu = function () {
    return [
        {
            name: '首页',
            link: '/',
            active: false
        },
        {
            name: '用户管理',
            link: '/jobseekers',
            active: false
        },
        {
            name: '公司管理',
            link: '/companies',
            active: false
        },
    ]
};

module.exports = {
    getOriginMenu,
    getMenu: function (link) {
        let menu = getOriginMenu();
        let activeIndex = menu.findIndex(function (item) {
            return item.link === link
        });
        menu[activeIndex === -1 ? 0 : activeIndex].active = true;
        return menu
    }
};