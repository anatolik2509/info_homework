$(document).ready(async function (){
    let anno_count;
    let current_page = 1;
    const prev_button = document.getElementById('prev');
    const next_button = document.getElementById('next');
    const anno_in_page = 5;
    await $.get("/announcements/quantity", function (res){
        anno_count = parseInt(res['count'])
    });

    let refresh = async function (page_num, page_elements_count) {
        let list = $('#announcement-list')
        list.children().remove()
        list.append("<div class='spinner'><div class=\"spinner-border\" role=\"status\"></div></div>")
        let announcements
        await $.get("/announcements?page=" + page_num + "&anno_count=" + page_elements_count, function (res){
            announcements = res;
        })
        let header, text, time, urgency, img_url, a
        list.children($(".spinner-border")).remove()
        for(let i = 0; i < announcements.length; i++){
            a = announcements[i]
            header = a['header']
            text = a['text']
            let matched_date_time = a['time'].match(/([0-9\-]+)T([0-9:]+)/);
            time = matched_date_time[1] + " " + matched_date_time[2]
            urgency = a['urgency']
            img_url = a['img_url']
            let list_element =
                "<li class=\"container-sm announcement\">\n" +
                "\t\t\t\t\t<div class=\"announcement-header\">\n" +
                "\t\t\t\t\t\t<h3>" + header + (urgency == true ? "<span class=\"badge badge-danger\">СРОЧНО</span>" : "") + "</h3>\n" +
                "\t\t\t\t\t\t<time class=\"text-muted announcement-time\">" + time + "</time>" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"announcement-body\">\n" +
                "\t\t\t\t\t\t<p>" + text +
                "\t\t\t\t\t\t</p>\n" +
                "\t\t\t\t\t</div>\n" +
                (img_url == null ? "":"<img class='announcement-img' src='" + img_url + "'>") +
                "\t\t\t\t</li>"
            list.append(list_element)
        }
    }

    let page_count = Math.ceil(anno_count/anno_in_page)

    for(let i = 1; i <= page_count; i++){
        $("#next").before("<li class=\"page-item\" id=\"nav_page_" + i + "\" data-page=" + i + ">" +
            "<a class=\"page-link\" href=\"#\">" + i + "</a>" +
            "</li>")
        document.getElementById("nav_page_" + i).onclick = function (){
            prev_button.classList.remove("disabled");
            next_button.classList.remove("disabled");
            $('.page-item').removeClass('active');
            current_page = parseInt(this.dataset.page);
            if(current_page === 1){
                prev_button.classList.add("disabled");
            }
            if(current_page === page_count){
                next_button.classList.add("disabled");
            }
            document.getElementById('nav_page_' + current_page).classList.add("active");
            refresh(current_page, anno_in_page)
        }
    }

    refresh(current_page, anno_in_page)

    document.getElementById('nav_page_' + current_page).classList.add("active");

    if(current_page === 1){
        prev_button.classList.add("disabled");
    }

    if(current_page === page_count){
        next_button.classList.add("disabled");
    }


    prev_button.onclick = function (){
        prev_button.classList.remove("disabled");
        next_button.classList.remove("disabled");
        $('.page-item').removeClass('active');
        current_page -= 1;
        if(current_page <= 1){
            prev_button.classList.add("disabled");
            current_page = 1;
        }
        if(current_page === page_count){
            next_button.classList.add("disabled");
        }
        document.getElementById('nav_page_' + current_page).classList.add("active");
        refresh(current_page, anno_in_page)
    };

    next_button.onclick = function (){
        prev_button.classList.remove("disabled");
        next_button.classList.remove("disabled");
        $('.page-item').removeClass('active');
        current_page += 1;
        if(current_page >= page_count){
            next_button.classList.add("disabled");
            current_page = page_count;
        }
        if(current_page === 1){
            prev_button.classList.add("disabled");
        }
        document.getElementById('nav_page_' + current_page).classList.add("active");
        refresh(current_page, anno_in_page)
    };

    document.getElementById('create-button').onclick = function (){
        //console.log($('#headerInput').val(), $('#Textarea').val(), $('#urgency-check').is(':checked'), $('#imgFile').prop('files')[0])
        $.post('/add_announcement',{
            'header': $('#headerInput').val(),
            'text' : $('#Textarea').val(),
            'urgency': $('#urgency-check').is(':checked')
        });
        refresh(current_page, anno_in_page)
    }

});