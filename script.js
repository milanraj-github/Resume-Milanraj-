$(function(){

  // Footer year
  $("#year, #year2").text(new Date().getFullYear());

  // Download PDF for resume — tuned to keep layout tight for A4
  $("#downloadPdfBtn").click(function() {
    const element = document.getElementById("resume");
    if (!element) return alert("Resume not found!");

    const opt = {
      margin: [6, 6, 6, 6], // mm top/right/bottom/left
      filename: "Milanraj_Resume_A4.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,            // increase for better quality
        useCORS: true,
        logging: false
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    // Temporarily increase font smoothing for canvas rendering if needed
    html2pdf().set(opt).from(element).save();
  });

  // Print biodata
  $("#printBtn").click(function(){
    window.print();
  });

  // --- Intro landing behavior ---
  // Hide resume content on first load so intro is the only visible section
  var $resume = $("#resume");
  var $intro = $(".intro-card");
  if ($resume.length && $intro.length) {
    $resume.hide();
    $intro.show();
  }

  // When user clicks 'View Resume', hide intro and show resume
  $("#viewResumeBtn").on('click', function(e){
    e.preventDefault();
    // update hash so direct links/bookmarks work
    location.hash = '#resume';
  });

  // showResume helper
  function showResume() {
    if (!($intro.length && $resume.length)) return;
    if ($intro.is(':visible')) {
      $intro.slideUp(220, function(){
        $resume.slideDown(300);
        setTimeout(function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }, 60);
      });
    } else {
      $resume.show();
    }
  }

  // If page loads with #resume, show resume instead of intro
  if (location.hash === '#resume') {
    showResume();
  }

  // Handle future hash changes (e.g., clicking nav link from other pages)
  $(window).on('hashchange', function(){
    if (location.hash === '#resume') showResume();
  });

});
