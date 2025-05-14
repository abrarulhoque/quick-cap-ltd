/**
 * QuickCap Ltd - Custom JavaScript
 * Handles animations, interactions and UI functionality
 */

document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar')

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // Testimonial slider functionality
  const testimonialSlides = document.querySelectorAll('.testimonial-slide')
  const dots = document.querySelectorAll('.dot')
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')
  let currentSlide = 0

  function showSlide (index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active')
    })

    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active')
    })

    // Show the current slide and activate the corresponding dot
    testimonialSlides[index].classList.add('active')
    dots[index].classList.add('active')
  }

  // Next slide function
  function nextSlide () {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }

  // Previous slide function
  function prevSlide () {
    currentSlide =
      (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showSlide(currentSlide)
  }

  // Event listeners for next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide)
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide)
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000)

  // Pause auto-advance when hovering over the slider
  const testimonialSlider = document.querySelector('.testimonial-slider')
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval)
    })

    testimonialSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      if (targetId === '#') return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })

  // Mobile menu toggle behavior
  const navbarToggler = document.querySelector('.navbar-toggler')
  const navbarCollapse = document.querySelector('.navbar-collapse')

  if (navbarToggler && navbarCollapse) {
    document.addEventListener('click', function (event) {
      const isClickInsideNavbar =
        navbarToggler.contains(event.target) ||
        navbarCollapse.contains(event.target)

      if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
        // Close the navbar if clicking outside
        navbarToggler.click()
      }
    })
  }

  // Add animation to elements when they enter the viewport
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate-on-scroll')

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate__fadeInUp')
        element.classList.add('animated')
        element.style.opacity = 1
      }
    })
  }

  // Initialize animation on scroll
  window.addEventListener('scroll', animateOnScroll)
  animateOnScroll() // Run once on page load

  // Form validation for contact/application forms
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener(
      'submit',
      event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
})
