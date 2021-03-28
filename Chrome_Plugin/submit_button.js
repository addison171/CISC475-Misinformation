    $("#button").click(function(e)){
        e.preventDefault();
        $.ajax({
            type:"POST",url:"/",data:JSON.stringify({message:$("#messafe").val(),
                }),
        success:[function(){
        alert('Record Inserted');
    }],
    error:[function(){
    alert('Error Returned');
    }]
    });
    });