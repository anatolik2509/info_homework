document.addEventListener('DOMContentLoaded', function (){
    eyes = Array.from(document.getElementsByClassName("eye"))
    const default_dist = 200
    for(e in eyes){
        eyes[e].center_x = eyes[e].getBoundingClientRect().x + eyes[e].getBoundingClientRect().width/2
        eyes[e].center_y = eyes[e].getBoundingClientRect().y + eyes[e].getBoundingClientRect().height/2
        eyes[e].point = eyes[e].getElementsByClassName("point")[0]
        eyes[e].y_radius = (eyes[e].getBoundingClientRect().height - eyes[e].point.getBoundingClientRect().height) / 2
        eyes[e].x_radius = (eyes[e].getBoundingClientRect().width - eyes[e].point.getBoundingClientRect().width) / 2
        eyes[e].dist = Number(eyes[e].dataset.dist == undefined ? default_dist : eyes[e].dataset.dist)
    }
    document.addEventListener('mousemove', (event) => {
        for(e in eyes){
            dist = eyes[e].dist
            dx = event.pageX - eyes[e].center_x
            dy = event.pageY - eyes[e].center_y
            radius = Math.sqrt(dx*dx + dy*dy)
            radius_modifier = Math.sqrt((radius)/(radius + dist))
            eyes[e].point.style.left = dx / radius * eyes[e].x_radius * radius_modifier + 'px'
            eyes[e].point.style.top = dy / radius * eyes[e].y_radius * radius_modifier + 'px'
        }
    })
})