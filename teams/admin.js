var teamsRef = firebase.database().ref('/teams');

var card = document.getElementById('teamlistholder');

teamsRef.once('value').then(function (snap){
    card.innerHTML = "";
    snap.forEach(function(childSnap) {
        var key = childSnap.key;
        var childData = childSnap.val();
        var cardContents = '<div class="row" style="margin: 10px;">'+
            '<div class="col-md-6">'+
                '<p class="form-label col-form-label-lg">'+ key.toUpperCase() +'</p>'+
            '</div>'+
            '<div class="col-md-4">'+
                '<input type="number" class="form-control form-control-lg" placeholder="points" value="' + childData.points + '">'+
            '</div>'+
            '<div class="col-md-2">'+
                '<button class="btn btn-success" onclick="updatePoints(this)">Update</button>'+
            '</div>'+
        '</div>';
        card.innerHTML += cardContents;
    });
});

function updatePoints(params) {
    const points = params.parentElement.previousSibling.firstChild.value;
    const team = params.parentElement.previousSibling.previousSibling.firstChild.innerText.toLowerCase();
    teamsRef.child(team).update({
        points:points
    },function (error){
        if(error){
            alert('Cannot Update');
        }
        else{
            card.innerHTML += '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
            '<strong>Success!</strong>  Value Updated'+
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        }
    });
}