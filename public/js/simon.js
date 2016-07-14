var score = 0;
		var	level = 0;
		var	randomSeq = [];
		var	userSeq = [];
		var sigils = $('.buttonset');
		var startB = $('button');

		
		sigils.click(function() {
			if (level == 0) {
				startB.animate({
					marginRight: "-=30px" 
				}, 150).animate({
					marginRight: "+=60px"
				}, 150).animate({
					marginRight: "-=30px"
				}, 100);
				$('.player').get(0).play();
			} else {
				$('.player').get(0).play();	
				var clickedButton = $(this).data('id');
				userSeq.push(clickedButton);
				console.log(userSeq);
				seqCheck();
				}
			});

		startB.click(function (){
			$('h1').html('Ye Olde Simple Simon - Westeros Edition')
			$('#jonsnow').attr('hidden', 'true');
			$('.buttons').removeAttr('hidden');
			$('.theme').currentTime = 0;
			$('.theme').get(0).play();
			gameStart();
		})

		sigils.hover(
			function() {
				$(this).css('opacity', '1')
			},
			function() {
				$(this).css('opacity', '.75')
			}
		);
		
		function animation() {
				var i = 0;
				var intervalID = setInterval(function() {
					$('[data-id="' + randomSeq[i] + '"]').animate({
						'opacity': '1'
					}, 750).animate({
						'opacity': '.75'
					}, 10);
					i++;
					if (i == randomSeq.length) {
						clearInterval(intervalID);
					}
				}, 750)

		};

		function gameStart() {
			randomSeq = [];
			userSeq = [];
			level = 1;
			score = 0;
			$('#score').html('0');
			seqGenerator();
			animation();
			
		};
		
		function seqGenerator() {
			randomSeq.push(Math.floor(Math.random() * 4) + 1);
		};

		function seqCheck() {
				
			if (userSeq.join() == randomSeq.slice(0, userSeq.length).join()) {
				if (userSeq.length == randomSeq.length) {
					score++;
					$('#score').html(score);
					userSeq = []
					level++;
					seqGenerator();
					animation();	
				}
				console.log('Correct')	
			} else {
				$('.buttons').attr('hidden', 'true');
				$('#jonsnow').removeAttr('hidden');
				$('h1').html('Your watch has ended');
				level = 0;
				$('.theme').get(0).pause();
				console.log('Incorrect');
			}
		};