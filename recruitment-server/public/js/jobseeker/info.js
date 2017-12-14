$(function () {
    console.log(__data);
    getResumes(__data._id);
});

/**
 * 根据用户ID获取简历数据
 * @param jobSeekerId 用户ID
 */
function getResumes(jobSeekerId) {
    $.ajax({
        url: '/resumes/getResumes',
        type: 'GET',
        data: {jobSeekerId},
        success(data) {
            if (data.status === 0) {
                writeResumes(data.data)
            } else {
                writeResumes(null, '获取简历信息出错了，刷新试试')
            }
        },
        error() {
            writeResumes(null, '获取简历信息出错了，刷新试试')
        }
    });
}

/**
 * 将简历信息追加到HTML上
 * @param resumes 简历信息
 * @param err 错误提示
 */
function writeResumes(resumes, err = '该用户还没有创建任何简历') {
    let tBody = $('#resumeTable').find('tbody');
    tBody.empty();
    if (resumes && resumes.length > 0) {
        let fragment = document.createDocumentFragment();
        resumes.forEach((resume, index) => {
            let row = $('<tr></tr>');
            row.append($(`<td>${index + 1}</td>`),
                $(`<td>${resume.resumeName}</td>`),
                $(`<td>${resume.jobName}</td>`),
                $(`<td class="hidden-xxs">${getWorkType(resume.typeOfWork)}</td>`),
                $(`<td class="hidden-xs">${resume.lowSalary}K-${resume.highSalary}K</td>`),
                $(`<td class="hidden-xs">${timeStampToDate(resume.updateTime)}</td>`),
                $(`<td><a class="btn btn-info btn-sm">查看</a></td>`),
            );
            fragment.appendChild(row[0]);
        });
        tBody[0].appendChild(fragment);
    } else {
        tBody.append(`<td class="no-data-td" colspan="6">${err}</td>`);
    }
}

/**
 * 获取工作类型
 * @param typeOfWork 工作类型代码
 * @return {*} 工作类型
 */
function getWorkType(typeOfWork) {
    let type;
    switch (typeOfWork) {
        case "1":
            type = '全职';
            break;
        case "2":
            type = '兼职';
            break;
        case "3":
            type = '实习';
            break;
    }
    return type;
}