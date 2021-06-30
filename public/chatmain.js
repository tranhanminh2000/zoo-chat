var socket = io("192.168.1.4:3000")
let arrAnimal = ['cat','chicken','elephant','giraffe',
                 'hippo','monkey','rhino','zibra']
let username = undefined;
let mess = undefined;
$(document).ready(function(){
    getTime()
    $('#btnStart').click(function(){
        $('#start').hide();
        $('#sectionLogin').show(500);
        $('#sectionLogin').css('display', 'flex');
    })
    $("#btnRegister").click(function(){
        username = $('#username').val()
        if(username === ""){
            alert('name is required !!!')
            return;
        }
        socket.emit("Client-send-Username", username)
    })
    $('#username').keypress(function(e) {
        if (e.keyCode == '13') {
            username = $('#username').val()
            socket.emit("Client-send-Username", username)
        }
    });
    $('#btnSendMess').click(function(){
        mess = $('#inputMess').val()
        if(mess.length !==0){ 
           socket.emit("Client-send-Message", mess)
           $('#inputMess').val('')
        }
        return;
    })
    $('#btnLogout').click(function(){
        let cfirm = confirm("Do you really want to logout ?")
        if(cfirm == true){
            socket.emit("logout")
            $('#sectionChat').hide()
            $('#start').show()
            username = undefined;
        }
        return;
    })
    $('#inputMess').keypress(function(e) {
        if (e.keyCode == '13') {
            socket.emit("Client-send-Message", $('#inputMess').val())
            $('#inputMess').val('')
        }
        return;
    });
    $('#inputMess').focusin(function() {
        socket.emit("Text-is-Editting")
    });
    $('#inputMess').focusout(function() {
        socket.emit("No-Editting")
    });
})

socket.on("Server-send-failure", (data)=>{
    alert(data)
})


socket.on('Someone-is-Sending', ()=>{
    $('#threedot').css('visibility', 'visible')
})
socket.on('Nobody-is-Sending', ()=>{
    $('#threedot').css('visibility', 'hidden')
})
socket.on("Server-send-success", (data)=>{
    $('nav .btn').show();
    $('#btnRegister').hide();
    randomAnimal(arrAnimal,data).then(function(animal){
        socket.emit("Client-send-Animal", animal)
    }); //async
})
socket.on('Sever-send-UserList', (data)=>{
    $('#userList').html('')
    if(data.length > 5){
        $('#userList').css('overflow-y', "scroll");
    }
    if(data.length <= 5){
        $('#userList').css('overflow-y', "none");
    }
    data.forEach(function(ele){
        if(ele.username == username){
            $("#userList").prepend(
                `
                    <div class="userComponent">
                        <div class='img'><img src="/static/animal/${ele.animal}.jpg"/></div>
                        <div class="infor">
                            <div id="name">${ele.username} (You)</div>
                            <div><span id="dot"></span>Online</div>
                            <div><span style="font-weight: bold">Joinat:  </span>${ele.loginTime}</div>
                        </div>
                    </div>
                `
            )
        }
        if(ele.username != username){
            $('#userList').append(
                `
                    <div class="userComponent">
                        <div class='img'><img src="/static/animal/${ele.animal}.jpg"/></div>
                        <div class="infor">
                            <div id="name">${ele.username}</div>
                            <div><span id="dot"></span>Online</div>
                            <div><span style="font-weight: bold">Joinat:  </span>${ele.loginTime}</div>
                        </div>
                    </div>
                `
                )
        }
        
    })
})
//connect to server
socket.on('Server-send-Message', function(data){
    $('#insideChat').html("")
    data.forEach(function(ele){
        if(ele.username == username){
            $('#insideChat').prepend(`
            <div id='message-warpper' style="flex-direction: row-reverse">
                <div id='block-userinfo'>
                    <div><img src='/static/animal/${ele.animal}.jpg'></div>
                    <div id='username'>${ele.username}</div>
                </div>
                <div id='block-content' style='margin-left: 0px;margin-right: 5px'>
                    <span id='content'>${ele.content}</span>
                </div>
                <div id='sendTime'>${ele.timeSend}</div>
            </div>
            `)
        }
        if(ele.username != username){
            $('#insideChat').prepend(`
            <div id='message-warpper'>
                <div id='block-userinfo'>
                    <div><img src='/static/animal/${ele.animal}.jpg'></div>
                    <div id='username'>${ele.username}</div>
                </div>
                <div id='block-content'>
                    <span id='content'>${ele.content}</span>
                </div>
                <div id='sendTime'>${ele.timeSend}</div>
            </div>
            `)
        }  
    })
})



