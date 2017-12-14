// 当前查询用户的关键字
let __keyword;
// 当前查找用户的方式
let __searchMode;

$(function () {
    if (__data.status !== 0) {
        __data = {
            list: [],
            count: 0,
            currentPage: 0,
            pageSize: 10
        }
    } else {
        __data = __data.data;
    }
    let paginationEle = $('#pagination');
    paginationEle.html(pagination(__data.count, __data.currentPage, __data.pageSize));
    // 表格（表格中编辑、查看简历和封禁）的点击
    $('table').on('click', (ev) => {
        let target = ev.target;
        if (target.nodeName === 'A') {
            if ($(target).hasClass('btn-danger')) {
                // 删除用户
                setModalTitle('警告');
                let deleteBtn = $('table td.op .btn-danger');
                let index = deleteBtn.index(target);
                let del = $('.modal .modal-body .delete');
                del.removeClass('hide');
                let rowData = __data.list[index];
                del.find('h4').html(`确定${rowData.usable ? '封禁' : '解封'}手机号码为&nbsp;<strong>${rowData.phone}</strong>&nbsp;的用户 ?`);
                showModal();
                __onConfirm = function () {
                    toggleUsable(rowData._id, rowData.usable)
                        .then(data => {
                            if (data.status === 0) {
                                __data.list[index].usable = !rowData.usable;
                                deleteBtn[index].textContent = rowData.usable ? '封禁' : '解封'
                            }
                        });
                    hideModal();
                };
                __onCancel = function () {
                    del.addClass('hide');
                };
            } else if ($(target).hasClass('btn-success')) {
                // 编辑用户
                setModalTitle('编辑用户信息');
                let index = $('table td.op .btn-success').index(target);
                let modify = $('.modal .modal-body .modify');
                modify.removeClass('hide');
                let rowData = __data.list[index];
                modify.find('input.phone').val(rowData.phone);
                let emailEle = modify.find('input.email').val(rowData.email);
                let addressEle = modify.find('input.address').val(rowData.address);
                __onConfirm = function () {
                    let email = emailEle.val();
                    let address = addressEle.val();
                    if (email || address) {
                        modifyJobSeeker(rowData._id, email, address)
                            .then(data => {
                                if (data.status === 0) {
                                    if (email) {
                                        __data.list[index].email = email;
                                        $('table tbody td.email')[index].textContent = email;
                                    }
                                    if (address) {
                                        __data.list[index].address = address;
                                        $('table tbody td.address')[index].textContent = address;
                                    }
                                    toastr.success('用户资料修改成功');
                                }
                                hideModal();
                            })
                    } else {
                        hideModal();
                    }
                };
                showModal();
                __onCancel = function () {
                    modify.addClass('hide');
                };
            } else if ($(target).hasClass('btn-info')) {
                let index = $('table td.op .btn-info').index(target);
                window.location.href = `/jobseekers/info?_id=${__data.list[index]._id}`;
            }
        }
    });

    // 增加用户点击
    $('#add').on('click', () => {
        setModalTitle('增加用户');
        let add = $('.modal .modal-body .add');
        let phoneEle = add.find('.phone');
        let passwordEle = add.find('.password');
        phoneEle.popover();
        passwordEle.popover();
        add.removeClass('hide');
        showModal();
        phoneEle.on('input', debounce((ev) => {
            let phone = ev.target.value;
            if (phone) {
                checkPhone(phone, phoneEle);
            } else {
                phoneEle.attr('data-content', '请输入手机号码');
                phoneEle.parent().parent().addClass('has-error');
                phoneEle.popover('show');
            }
        }, 300));
        __onConfirm = function () {
            let phone = phoneEle.val();
            let password = passwordEle.val();
            if ($('.modal .add').find('.has-error').length !== 0) {
                toastr.error('请输入正确的手机号和密码!');
                return;
            }
            if (!password) {
                toastr.error('请输入正确的手机号和密码!');
                return;
            }
            hideModal();
            phoneEle.val(null);
            passwordEle.val(null);
            addJobSeeker(phone, password);
        };
        __onCancel = function () {
            add.addClass('hide');
        };
    });

    // 分页点击
    paginationEle.on('click', (ev) => {
        ev.preventDefault();
        let page = parseInt(ev.target.textContent);
        if (!isNaN(page) && page !== __data.currentPage) {
            getJobSeekers(page, __data.pageSize, __keyword, __searchMode)
        } else {
            if (ev.target.className === 'prev' && __data.currentPage > 1) {
                getJobSeekers(__data.currentPage - 1, __data.pageSize)
            } else if (ev.target.className === 'next' && __data.currentPage < __data.count) {
                getJobSeekers(__data.currentPage + 1, __data.pageSize, __keyword, __searchMode)
            }
        }
    });

    paginationEle = null;

    // 搜索点击事件
    $('#searchBtn').on('click', () => {
        let keyword = $('#keyword').val();
        if (!keyword) {
            __keyword = null;
            __searchMode = null;
            getJobSeekers(1, __data.pageSize)
        } else {
            let searchMode = $('select.search-mode').val();
            __keyword = keyword;
            __searchMode = searchMode;
            getJobSeekers(1, __data.pageSize, keyword, searchMode);
        }
    })
});

function modifyJobSeeker(_id, email, address) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: '/jobseekers/modifyJobSeeker',
            data: {_id, email, address},
            success(data){
                resolve(data)
            },
            error(){
                toastr.error('修改失败了，请稍后重试...');
            }
        })
    });
}
function toggleUsable(_id, usable) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: '/jobseekers/modifyJobSeeker',
            data: {_id, usable: usable ? 0 : 1},
            success(data) {
                resolve(data);
            }
        })
    })
}
/**
 * 获取用户数据
 * @param page 要得到的第几页的页数
 * @param pageSize 显示的数据条数
 * @param keyword 搜索关键字
 * @param searchMode 搜索方式
 */
function getJobSeekers(page, pageSize, keyword, searchMode) {
    let formData = {
        page,
        pageSize
    };
    if (searchMode) {
        formData.keyword = keyword;
        formData.searchMode = searchMode;
    }
    $.ajax({
        url: '/jobseekers/getJobSeekers',
        data: formData,
        success(data) {
            if (data.status === 0 && data.data) {
                data = data.data;
                if (data.count !== __data.count) {
                    $('div.tab-content>p.text-muted').text(`为您找到${data.count}条用户数据`);
                }
                __data = data;
                writeDataToHTML(data);
            }
        },
        error() {
            toastr.error('加载数据出错了...');
        }
    });
}
/**
 * 将用户数据写到页面上，并修改分页
 * @param data 用户数据
 */
function writeDataToHTML(data) {
    let currentPage = data.currentPage || 1;
    let pageSize = data.pageSize || 10;
    let i = (currentPage - 1) * pageSize;
    let fragment = document.createDocumentFragment();
    let date = new Date();
    data.list.forEach((item, index) => {
        date.setTime(item.userId);
        fragment.appendChild(getRow(item, i + index + 1, date.toLocaleDateString())[0]);
    });
    let tbody = $('table tbody').empty();
    tbody[0].appendChild(fragment);
    refreshPagination(data.count, currentPage, pageSize);
}

function getRow(item, index, date) {
    if (!date) {
        date = new Date();
        date.setTime(item.userId);
        date = date.toLocaleDateString()
    }
    let tr = $('<tr></tr>');
    let opTd = $('<td class="op"></td>')
        .append($('<a class="btn btn-xs btn-info hidden-xs">查看详情</a>'),
            $('<a class="btn btn-xs btn-success">编辑</a>'),
            $(`<a class="btn btn-xs btn-danger">${item.usable ? '封禁' : '解封'}</a>`));
    tr.append($(`<td>${index}</td>`),
        $(`<td>${item.phone || '-'}</td>`),
        $(`<td class="email">${item.email || '-'}</td>`),
        $(`<td class="address">${item.address || '-'}</td>`),
        $(`<td class="hidden-xs">${date}</td>`),
        opTd);
    return tr;
}
function refreshPagination(count, currentPage, pageSize) {
    $('#pagination').html(pagination(count, currentPage, pageSize));
}
/**
 * 检查手机号码是否存在
 * @param phone 手机号码
 * @param element 手机号码输入的input组件
 */
function checkPhone(phone, element) {
    $.ajax({
        url: '/jobseekers/checkPhone',
        data: {phone},
        success (data) {
            if (data.status === 0 && data.data) {
                element.attr('data-content', '该手机号码已存在');
                element.parent().parent().addClass('has-error');
                element.popover('show');
            } else {
                element.parent().parent().removeClass('has-error');
                element.popover('hide');
            }
        },
        error() {
            toastr.error('系统异常，请稍后重试..');
        }
    })
}
/**
 * 增加用户数据
 * @param phone 手机号码
 * @param password 密码
 */
function addJobSeeker(phone, password) {
    $.ajax({
        url: '/jobseekers/addJobSeeker',
        type: 'POST',
        data: {
            phone, password
        },
        success(data) {
            if (data.status === 0 && data.data) {
                let count = __data.count;
                let pageSize = __data.pageSize;
                let countInfo = $('div.tab-content>p.text-muted');
                if (Math.ceil(count / pageSize) === Math.ceil((count + 1) / pageSize) || count === 0) {
                    console.log(__data, count);
                    if (__data.currentPage === (count === 0 ? 1 : Math.ceil(count / pageSize))) {
                        if (!__keyword) {
                            $('table tbody').append(getRow(data.data, __data.list.length + 1));
                        }
                        if (__keyword && __searchMode === 'phone' && data.data.phone.includes(__keyword)) {
                            $('table tbody').append(getRow(data.data, __data.list.length + 1));
                            countInfo.text(`为您找到${__data.count}条用户数据`);
                        }
                        count === 0 && refreshPagination(count + 1, __data.currentPage, __data.pageSize);
                    }
                } else {
                    refreshPagination(count + 1, __data.currentPage, __data.pageSize);
                }
                __data.count = count + 1;
                // 更新数据总数
                !__keyword && countInfo.text(`为您找到${__data.count}条用户数据`);
                toastr.success('增加用户成功');
            } else {
                toastr.error('增加用户失败了..');
            }
        },
        error() {
            toastr.error('系统异常，请稍后重试..');
        }
    })
}