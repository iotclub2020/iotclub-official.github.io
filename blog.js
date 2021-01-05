const blogBody = document.getElementById("blog-container"); 

const blog = firebase.database().ref('blogs');

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("id");
if (c != null){
    window.stop();
    var count = 0;
    blog.child(c).once('value').then(function(snap){
        count = snap.val().likes + 1;
        blog.child(c).update({'likes': count},(error)=>{if (!error) window.location = "https://iotclub2020.github.io/blogging.html";});
    });

}

blog.once('value').then(function (snapshot){
    blogBody.innerHTML = "";
    snapshot.forEach(function(item){
        var name = item.val().name;
        var body = item.val().body;
        var likes = item.val().likes;
    
        var context = '<div class="g-bg-color--sky-light">'+
        '<div class="container g-padding-y-10--xs g-padding-y-125--xsm">'+
            '<div class="row d-flex justify-content-center">'+
                    '<div class="col-md-12 d-flex justify-content-center">'+
                        '<div class="wow fadeInUp" data-wow-duration=".3" data-wow-delay=".1s">'+
                            '<div class="s-plan-v1 g-text-center--xs g-bg-color--white g-padding-y-100--xs">'+
                                '<h3 class="g-font-size-40--xs g-font-size-50--sm g-font-size-60--md">'+
                                name +
                                '<h3 class="g-font-size-20--xs">' + body + '</h3>'+
                                '<p>Total Likes: <p>'+
                                likes +
                                '</p></p>'+
                                '<a class="btn btn-success" href="https://iotclub2020.github.io/blogging.html?id='+ item.key.toString() +'"><i class="large material-icons">thumb_up</i></a>'+
                            '</div></div></div></div></div>';
        blogBody.innerHTML += context;
    });
});


function posttoblog(){
    var name = document.getElementById('name').value;
    var contents = document.getElementById('body').value;
    var blogref = firebase.database().ref('/blogs');
    var newMessageRef = blogref.push();
    newMessageRef.set({ 
    'name': name,
    'body': contents,
    'likes': 0
    });
var path = newMessageRef.toString();
console.log(path);
location.reload();
}

function like(){
    var likeCount = document.getElementById('like-count');
    console.log(likeCount.innerText);
    likeCount.innerText = String(parseInt(likeCount.innerText)+1);
}



