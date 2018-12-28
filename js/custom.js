(function(){

	var player1Name="" , player2Name="", turn = "";
	var grid =  [[0,0,0],[0,0,0],[0,0,0]];
	var hasWinner = 0, moveCount=0;

	function MsgDisplay(x){
		return $("#board").text(x);								// Universal function to display message		
	}

	function setplayerturn(){									// Set Player's turn based on click function
		var r = Math.floor((Math.random() * 2) + 1);
		hasWinner=0;
		if(r==1){
			turn = player1Name;
			MsgDisplay(player1Name+"'s turn now!");
		}
		else{
			turn = player2Name;
			MsgDisplay(player2Name+"'s turn now!");
		}
	}

	function init(){											// Initialize the Tic-tac-toe game
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		MsgDisplay("");
		$(".col").map(function() {
			$(this).find('span').text("");
			$(this).removeClass('visible');
		}).get();
		$('.message').text('').removeClass('active');
		hasWinner = 0;
		moveCount=0;
	}
	
	function msgRemove(){			
		setTimeout(function(){
			$('.message').removeClass('active');
		},5000);
	}

	$(document).ready(function(){
			
		$("#playButton").click(function (){

			if(hasWinner==1){
				init();
			}

			player1Name = $("#player-1-inp").val();
			player2Name = $("#player-2-inp").val();

			if(player1Name=="" || player2Name==""){
				$('.message').text("Please set player's name.").addClass('active');
				msgRemove();
				return;
			}else if(player1Name == player2Name){
				$('.message').text("Player's name should not match.").addClass('active');					
				msgRemove();
				return;
			}
			
			setplayerturn();
		});

		$(".col").click(function (){

			if(player1Name=="" || player2Name==""){
				$('.message').text("Please enter player's name.").addClass('active');					
				msgRemove();
				return;
			}

			var row = $(this).parent().index();
			var col = $(this).index();

			if(grid[row][col]!==0 && hasWinner!=1){
				$('.message').text("This block is taken. Please try other block.").addClass('active');				
				msgRemove();
				return;
			}
			if(hasWinner==1){
				$('.message').text("Please click play again").addClass('active');					
				msgRemove();
				return;
			} 

			if(turn==player1Name){
				moveCount++; 
				$(this).find('span').text("O").parent().addClass('visible');
				grid[row][col] = 1;
				var ifWon = checkwinner(1,player1Name);
				if(!ifWon){
					if(moveCount>=9){
						MsgDisplay("Match Drawn!");
						moveCount=0;
						$("#playButton").text("Play again");
						hasWinner=1;
						return;
					}else{
						turn = player2Name;
						MsgDisplay(player2Name+"'s turn now!");
					}
					return;	
				}
				else{
					return;
				}
				
			}
			else if(turn==player2Name){
				moveCount++; 
				$(this).find('span').text("X").parent().addClass('visible');
				grid[row][col] = 2;
				var ifWon = checkwinner(2,player2Name);
				if(!ifWon){
					if(moveCount>=9){
						MsgDisplay("Match Drawn!");
						moveCount=0;
						$("#playButton").text("Play again");
						hasWinner=1;
						return;
					}else{
						turn = player1Name;
						MsgDisplay(player1Name+"'s turn now!");
					}
					return;	
				}
				else{
					return;
				}
				
			}

		});


	});

	function checkwinner(n,playerName){
		if(

			(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
			(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
			(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

			(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
			(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
			(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

			(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
			(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


			){
			MsgDisplay(playerName+" won the game!");
			hasWinner = 1;
			moveCount=0;
			$("#playButton").text("Play again");
			return true;
		}
		return false;
	}

}());