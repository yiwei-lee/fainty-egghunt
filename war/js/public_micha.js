function colorCandy(candyType) {
	if(candyType == "bonbon") {
		 $(".collectable1").each(function() {
			  $( this ).attr("src", "img/theme1/collectible1.png");
			  collectedCandy[0] = "1";
		 });
	 } else if(candyType == "lolly") {
		 $(".collectable2").each(function() {
			  $( this ).attr("src", "img/theme1/collectible2.png");
			  collectedCandy[1] = "1";
		 });
	 } else if(candyType == "drop") {
			 $(".collectable3").each(function() {
				  $( this ).attr("src", "img/theme1/collectible3.png");
				  collectedCandy[2] = "1";
			 });
	 } 
}