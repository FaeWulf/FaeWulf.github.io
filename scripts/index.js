$(document).ready(function() {

  $(".social#discord").hover(
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-discord").stop(true, false).animate({ "width": 'toggle' })
    },

    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-discord").stop(true, false).animate({ "width": 'toggle' })
    }
  )

  $(".social#youtube, .social#facebook, .social#steam").hover(
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
    },
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
    }
  )

  //github
  $(".social#github").hover(
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-github").stop(true, false).animate({ "width": 'toggle' })
    },
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-github").stop(true, false).animate({ "width": 'toggle' })
    }
  )

  $(".social#email").hover(
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-email").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-url").stop(true, false).animate({ "width": 'toggle' })
    },

    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-email").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-url").stop(true, false).animate({ "width": 'toggle' })
    }
  )

  $(".social#homepage").hover(
    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-url").stop(true, false).animate({ "width": 'toggle' })
    },

    function() {
      $(".title>#title-Iam").stop(true, false).animate({ "width": 'toggle' })
      $(".title>#title-url").stop(true, false).animate({ "width": 'toggle' })
    }
  )
});
