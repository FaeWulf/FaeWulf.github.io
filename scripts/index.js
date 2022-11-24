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
    }, function() {
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

  $(".badge").hover(
    function() {
      let level = this.title.toLowerCase();
      $(`#subtitle-${level}`).stop(true, false).animate({ "width": 'toggle' })

      $("#subtitle-specific").text(this.alt + " developer ")

      if (level != "advanced-beginner")
        $(`#subtitle-vowel`).stop(true, false).animate({ "width": 'toggle' })

      $(`#subtitle-prefix`).stop(true, false).animate({ "width": 'toggle' })
      $(`#subtitle-suffix`).stop(true, false).animate({ "width": 'toggle' })
    },

    function() {
      let level = this.title.toLowerCase();
      $(`#subtitle-${level}`).stop(true, false).animate({ "width": 'toggle' })

      if (level != "advanced-beginner")
        $(`#subtitle-vowel`).stop(true, false).animate({ "width": 'toggle' })

      $("#subtitle-specific").text("developer ")

      $(`#subtitle-prefix`).stop(true, false).animate({ "width": 'toggle' })
      $(`#subtitle-suffix`).stop(true, false).animate({ "width": 'toggle' })
    }
  )

});
