document.addEventListener('DOMContentLoaded', function (){
    player = document.getElementById("player")
    box = document.getElementById("box")


    const G = 0.1
    const field_height = window.getComputedStyle(box, null).height.match('[0-9]*')[0]
    const field_width = window.getComputedStyle(box, null).width.match('[0-9]*')[0]

    player_x = 0
    player_y = 0
    player_Vx = 5
    player_Vy = 5

    move = function (element, x, y){
        player_x += x
        player_y += y
        element.style.left = player_x + 'px'
        element.style.top = player_y +'px'
    }

    console.log(field_height, field_width)

    a = setInterval(function (){
        player_Vy += G
        if(player_x < 0){
            player_Vx *= -0.9
            move(player, -player_x, 0)
        }
        if((player_x + 50) > field_width){
            player_Vx *= -0.9
            move(player, field_width - player_x - 50, 0)
        }
        if(player_y < 0){
            player_Vy *= -0.9
            move(player, 0, -player_y)
        }
        if((player_y + 50) > field_height){
            player_Vy *= -0.9
            move(player, 0,field_height - player_y - 50)
        }
        move(player, player_Vx, player_Vy)
    }, 20)
})