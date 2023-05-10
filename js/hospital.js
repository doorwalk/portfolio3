$(function() {
	// 팝업창
	$("#popup").fadeIn(500);    // 팝업창 띄우기
	$("#close_cb").click(function() {    // 체크박스 클릭시 팝업창 닫기
		$("#popup").fadeOut(500);
	});
	
	// LANGUAGE요소의 하위메뉴 보이기 및 숨기기
	$(".lang").hover(
		function() {  // 마우스를 올렸을 경우
			$(this).children(".lang_menu").stop().slideDown().css({
				background : "rgba(0,255,0,0.3)"
			});
		},
		function() {  // 마우스를 내렸을 경우
			$(this).children(".lang_menu").stop().slideUp().css({
				background : "rgba(255,255,255,0.5)"
			});
		}
	);

	// gnb menu 하위메뉴 보이기 및 숨기기
	let check = 0;  // gnb_All 버튼을 눌렀을 경우 0, 1의 값을 할당하는 변수(gnb_All버튼을 눌러서 모든 하위메뉴가 보였을 때 gnb_item요소에 hover 할 경우 해당 요소의 하위메뉴가 사라지거나 나타나기 때문에 그것을 방지하기 위함입니다.)
	
	$(".gnb_item").hover(    // 처음 웹페이지를 접속하자마자 hover이벤트를 처리하기 위함. 처음에 check변수값이 0이기때문에 이 코드가 없으면 hover이벤트를 바로 실행못한다.
		function() { 
			$(this).children(".dropdown_list").stop().slideDown();  // 각각의 li의 하위메뉴를 따로 보여준다.
		},
		function() {
			$(this).children(".dropdown_list").stop().slideUp();  // 각각의 li의 보여진 하위메뉴를 숨긴다.
		}
	);

	$("#gnb_All").click(function() {   //gnb_All버튼을 클릭할 경우
		$(".dropdown_list").stop().slideToggle();   // 클릭할때마다 번갈아가면서 하위메뉴를 보였다가 숨겼다가 하는 기능.
		$(".dropdown_bg").stop().slideToggle();

		if ( check % 2 == 1) {   // check변수 값이 홀수일 경우 실행
			$(".gnb_item").hover(
				function() { $(this).find(".dropdown_list").stop().slideDown().css({background : "rgba(0,0,255,0.5)"}); },
				function() { $(this).find(".dropdown_list").stop().slideUp(); }
			);
		} else {   // 짝수일 경우에는 하위메뉴들을 마우스를 올리든 내리든 항상 하위메뉴는 내려와있게 한다.
			$(".gnb_item").hover(
				function() { $(this).find(".dropdown_list").stop().slideDown().css({background : "rgba(0,0,0,0.05)"}); },
				function() { $(this).find(".dropdown_list").stop().slideDown(); }
			);
			$(".dropdown_list").css({background : "rgba(0,0,0,0.05)"});
		}
		check++;
	});
	
	// 이미지 슬라이드
	let slideIndex = 1;         // 처음에 첫번째 이미지를 보여주기위해 1을 할당
	showSlides(slideIndex);   //slideIndex값에 해당하는 이미지로 슬라이드하는 험수

	// Next/previous controls
	function plusSlides(n) {  // 다음, 이전버튼을 클릭했을때 호출되는 함수
	  showSlides(slideIndex += n);
	}

	// Thumbnail image controls
	function currentSlide(n) {  // dot요소를 클릭할 경우 호출되는 함수
	  showSlides(slideIndex = n);
	}

	function showSlides(n) {
		let slidesLeng = $(".mySlides").length;   // 슬라이드용 이미지의 총 개수

		if (n > slidesLeng) {  // 이미지의 총 개수보다 n값이 클 경우
			slideIndex = 1    // slideIndex에 1을 할당하여 첫번째 이미지를 보여준다.
		}
		if (n < 1) {  // n이 1보다 작을 경우
			slideIndex = slidesLeng   // 이미지의 총 개수값을 할당하여 마지막 이미지를 보여준다.
		}
		
		$(".mySlides").stop().fadeOut();
		$(".mySlides").eq(slideIndex-1).stop().fadeIn();

		$(".dot").find("img").attr("src", "images/slide_dot_w.png");
		$(".dot").eq(slideIndex-1).find("img").attr("src", "images/slide_dot_n.png");
	}
	
	$(".prev").click(function() {  // 이전버튼 클릭할 경우
		plusSlides(-1);      // plusSlides함수에 -1을 전달
	});
	$(".next").click(function() {  // 다음버튼 클릭할 경우
		plusSlides(1);      // plusSlides함수에 1을 전달
	});
	
	$(".dot").click(function() {   // dot을 클릭할 경우
		let dotIdx = $(this).index();   // 클릭한 dot의 인덱스번호를 할당
		currentSlide(dotIdx+1);     // currentSlide함수에 클릭한 dot의 인덱스번호에 1을 더한값을 전달
	});
	
	// 자동 이미지 슬라이드
	let interval = setInterval( () => {
		showSlides(slideIndex);
		slideIndex++;
	}, 3000);
	
	
	// lnb3 (건강정보영상, 건강칼럼)
	$("#button_box1 button").click(function() {
		let box1_button_idx = $(this).index();   // 클릭된 요소의 내용을 보여주기 위한 인덱스 번호
		
		$(this).siblings().css({  // 클릭된 버튼이외의 버튼은 스타일 없애기
			boxShadow : "",
			background : "",
			fontWeight : ""
		});
		
		$(this).css({  // 클릭된 버튼만 스타일 적용
			boxShadow : "2px 2px 2px gray",
			background : "orange",
			fontWeight : "bold"
		});
		
		$(".contents1").eq(box1_button_idx).fadeIn(500);   // 클릭된 요소의 내용 보여주기
		$(".contents1").eq(box1_button_idx).siblings().fadeOut(500);  // 클릭되지않은 요소의 내용 사라지게하기
	});
	$(".video_btn").trigger("click");  // 처음에 건강정보영상 요소를 보여주기위해 트리거를 사용
	
	// lnb4 (병원정보, 언론보도, 채용정보)
	$("#button_box2 button").click(function() {
		let box2_button_idx = $(this).index();   // 클릭된 요소의 내용을 보여주기 위한 인덱스 번호
		
		$(this).siblings().css({  // 클릭된 버튼이외의 버튼은 스타일 없애기
			boxShadow : "",
			background : "",
			fontWeight : ""
		});
		
		$(this).css({  // 클릭된 버튼만 스타일 적용
			boxShadow : "2px 2px 2px gray",
			background : "orange",
			fontWeight : "bold"
		});
		
		$(".contents2").eq(box2_button_idx).fadeIn(500);   // 클릭된 요소의 내용 보여주기
		$(".contents2").eq(box2_button_idx).siblings().fadeOut(500);  // 클릭되지않은 요소의 내용 사라지게하기
	});
	$(".info_btn").trigger("click");  // 처음에 건강정보영상 요소를 보여주기위해 트리거를 사용
	
	
	/* 맨위, 맨아래로 이동하는 버튼 */
	$(window).on("scroll", function() {
		let scrollV = $(this).scrollTop();  // 스크롤된 값 할당
		
		if ( scrollV >= 200 ) {  // 맨 위에서 스크롤된 값이 200이상일 경우
			$(".topMove").fadeIn(300);    // top버튼 보이기
		} else {                       // 맨 위에서 스크롤된 값이 200미만일 경우
			$(".topMove").fadeOut(300);   // top버튼 숨기기
		}
		
		if ( scrollV == $(document).height() - $(window).height() ) {  // 스크롤이 맨 아래일 경우
			$(".bottomMove").fadeOut(300);    // bottom버튼 숨기기
		} else {
			$(".bottomMove").fadeIn(300);    // bottom버튼 보이기
		}
	});
	
	$(".topMove").click(function() {   // top버튼 클릭할 경우
		$("html, body").animate({ scrollTop : 0}, 500);  // 웹브라우저 창의 맨 상단으로 이동
	});
	
	$(".bottomMove").click(function() {   // bottom버튼 클릭할 경우
		$("html, body").animate({ scrollTop : document.body.scrollHeight }, 500);  // 웹브라우저 창의 맨 하단으로 이동
	});
	/* wrapper 보이기 및 숨기기 버튼 */
	$(".wrapperFade").click(function() {
		$("#wrapper").fadeToggle();
		$(".bottomMove").fadeToggle();
	});
	
	/* body 배경이미지 바꾸기 */
	let bgNum = 1;    // 배경이미지 이름 숫자(하나씩 증가하면서 바꾼다.)
	$(".bodyBgChange").click(function() {  //배경이미지 변경 버튼 클릭할 경우
		bgNum++;      // 이전의 배경이미지 이름 숫자에 1을 더한다.
		if ( bgNum > 4 ) {   // 배경이미지가 4장이기때문에 4이상이 될 경우
			bgNum = 1;     // 다시 1값을 할당하여 첫번째 배경이미지를 보여준다.
		}
		
		$("body").css({    // body요소의 배경이미지를 변경시키기 위한 코드
			backgroundImage : "url(images/line_bg.png), url(images/body_bg" + bgNum + ".jpg)",
			backgroundRepeat : "repeat-x, no-repeat",
			backgroundAttachment : "scroll, fixed",
			backgroundPosition : "left 2581px, center",
			backgroundSize : "cover, cover"
		});
	});
});