// ---------Responsive-navbar-active-animation-----------
function update() {
	var activeTab = $("li.nav-item.active");

	$(".hori-selector").css({
		"top": activeTab.position().top + "px",
		"left": activeTab.position().left + "px",
		"height": activeTab.innerHeight() + "px",
		"width": activeTab.innerWidth() + "px"
	});

	console.log(activeTab.position())

}

function body_resize() {
	$("#body-content").css({
		"top": $('#navbar').position().top + $('#navbar').innerHeight() + "px",
		"height": $(window).height() - $("#navbar").innerHeight() + "px"
	})

	$("div#body-content>div#Terminal,div#body-content>div#Projects").css({
		"height": $(window).height() - $("#navbar").innerHeight() - 20 + "px",
		"maxheight": $(window).height() - $("#navbar").innerHeight() - 20 + "px"
	})

	if(isPhone()) {
		$(".tiling_window#Console").css({
			"width": "calc(100% - 40px)",
			"overflow": "auto"
		})
		$(".tiling_window#IDE").css({
			"width": "calc(100% - 20px)"
		})
		
	}
}

function discord_alert(node) {
	return confirm("My username is Faewulf#0901");
}

$(document).ready(function () {
	setTimeout(function () { update(); }, 300);
	setTimeout(function () { body_resize() });

	//tab manager init
	let id = $(".active").attr("id")

	$("#body-content").children().each(function (i, obj) {
		if (tabs[id].includes($(this).attr("id")))
			$(this).css({
				"display": ""
			})
		else
			$(this).css({
				"display": "none"
			})
	})

	//phone tweak
	if (isPhone()) {
		// full size terminal, disabling windows on purpose
		$("#home-switcher").show()
		$(".tiling_window#Terminal").css({
			"width": "auto",
		})

		$(".tiling_window#IDE, .tiling_window#Console").hide()
	}
});

$(window).on('resize', function () {
	setTimeout(function () { update(); }, 300);
	setTimeout(function () { body_resize() });
});

$("#nav-hidder").click(function () {
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function () { update(); });
	setTimeout(function () { body_resize() }, 300);
	$(".navbar-toggler").show(500)
})

$(".navbar-toggler").click(function () {
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function () { update(); });
	setTimeout(function () { body_resize() }, 300);
	$(this).hide()
});

$("#home-switcher").click(function () {
	if ($(".nav-item.active").attr("id") != "home")
        return

	$(".tiling_window#IDE, .tiling_window#Console").toggle()
	$(".tiling_window#Terminal").toggle()

});


//nav bar click event
$(".nav-item").each(function (i, obj) {


	$(`#${obj.id}`).click(function () {

		$("#home-switcher").hide()

		//update selector position
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');

		$(".hori-selector").css({
			"top": $(this).position().top + "px",
			"left": $(this).position().left + "px",
			"height": $(this).innerHeight() + "px",
			"width": $(this).innerWidth() + "px"
		});

		//change to other tab
		let id = obj.id
		$("#body-content").children().each(function (i, obj) {
			if (tabs[id].includes($(this).attr("id")))
				$(this).css({
					"display": ""
				})
			else
				$(this).css({
					"display": "none"
				})
		})

		//if phone
		if (isPhone()) {
			// full size terminal, disabling windows on purpose
			$(".tiling_window#Terminal").css({
				"width": "auto"
			})

			$(".tiling_window#IDE, .tiling_window#Console").hide()
			
			if(id == "home")
				$("#home-switcher").show()
		}
	})
})






// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });