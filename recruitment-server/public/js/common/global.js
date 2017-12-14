// 模态框
let __modal;
// 模态框确定事件
let __onConfirm;
// 模态框取消事件
let __onCancel;

$(function () {
    __modal = $('#modal-container');
    toastr.options = {
        closeButton: true,
        timeOut: 3000
    };
    $('#confirm').on('click', function (ev) {
        __onConfirm && __onConfirm(ev);
    });
    __modal.on('hide.bs.modal', function (ev) {
        if (__onCancel) {
            __onCancel(ev);
            __onCancel = null;
            __onConfirm = null;
        }
    }).on('show.bs.modal', function () {
    })
});

/**
 * 设置模态框标题
 * @param title 标题
 */
function setModalTitle(title) {
    $('.modal .modal-header .modal-title').text(title);
}

/**
 * 显示模态框
 */
function showModal() {
    __modal.modal('show');
}

/**
 * 隐藏模态框
 */
function hideModal() {
    __modal.modal('hide');
}

/**
 * 节流
 * @param fun 执行的函数
 * @param delay 延迟
 * @return {Function}
 */
function debounce(fun, delay) {
    let timer;
    return function (...val) {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fun.apply(this, val);
        }, delay)
    }
}

/**
 * 分页方法
 * @param count 数据总数
 * @param currentPage 当前页面
 * @param pageSize 当前页面显示条数
 * @return {*} 分页的HTML
 */
function pagination(count, currentPage, pageSize) {
    if (count === 0 || currentPage < 1 || pageSize < 1)
        return null;
    // 总条数转成总页数
    count = Math.ceil(count / pageSize);
    let nav = $('<nav></nav>');
    let ul = $('<ul class="pagination"></ul>');
    // 上一页按钮
    let prev = $('<li><a href="#" class="prev"><span aria-hidden="true">&laquo;</span></a></li>');
    if (currentPage === 1)
        prev.attr('class', 'disabled');
    ul.append(prev);
    if (count < 9) {
        for (let i = 1; i <= count; i++) {
            let li = $(`<li><a href="#">${i}</a></li>`);
            if (i === currentPage)
                li.attr('class', 'active');
            ul.append(li);
        }
    } else {
        let array = [];
        if (currentPage < 5) {
            for (let i = 1; i <= currentPage + 1; i++) {
                array.push(i);
            }
        } else {
            array.push(1);
            array.push(2);
            array.push('...');
            array.push(currentPage - 1);
            array.push(currentPage);
            currentPage !== count && array.push(currentPage + 1);
        }
        if (count - currentPage > 2) {
            array.push('...');
            array.push(count - 1);
            array.push(count);
        }
        array.forEach((item) => {
            let li = $(`<li><a href="#">${item}</a></li>`);
            if (item === currentPage)
                li.attr('class', 'active');
            if (item === '...')
                li.attr('class', 'disabled');
            ul.append(li);
        })
    }
    // 下一页按钮
    let next = $('<li><a href="#" class="next"><span aria-hidden="true">&raquo;</span></a></li>');
    if (currentPage === count)
        next.attr('class', 'disabled');
    ul.append(next);
    return nav.append(ul);
}

/**
 * 将时间戳转化为日期
 * @param ts 时间戳
 * @return {string} 日期
 */
function timeStampToDate(ts) {
    let date = new Date();
    date.setTime(ts);
    return date.toLocaleDateString();
}