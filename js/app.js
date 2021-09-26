// build the nav
// looping over each section in the page
var sections = [...document.querySelectorAll('section')];

//looping for all sections in the page
sections.forEach((section, index) =>{
    //  Creating nav item for each section 
    var navItem = document.createElement('li');
    index += 1; 
    navItem.innerHTML = `<a href ="#section${index}" class="menu__link"><span class="p-3 mx-3">Section ${index}</span></a>`;

    var navList = document.querySelector('#navbar__list');
    navList.appendChild(navItem);
    
    // give active class on click + remove the class from other siblings
    navItem.onclick = function(){
        var clickedId = this.firstChild.getAttribute('href').substring(1);
        // looping over the clicked siblings to remove the active class
        var selectedSection = document.getElementById(clickedId);
        // looping over the clicked siblings to remove the active class
        for (let sibling of selectedSection.parentNode.children){
            if (sibling !== selectedSection){
                sibling.classList.remove('your-active-class');
            }
        }
        selectedSection.classList.add('your-active-class');
    }

});


// using intersection observer to know when section is fully shown in viewport
if(!!window.IntersectionObserver){
    // observing to see whenever a section is fully visible in the viewport
    let observer = new IntersectionObserver((entries) => { 
      entries.forEach(entry => {
        var activeId = entry.target.attributes.id.nodeValue;
        var activeNavItem = document.querySelector(`a[href = '#${activeId}']`);
        if(entry.isIntersecting){
            // looping over section to give an active class to the fully visible one
            for (let sibling of entry.target.parentNode.children){
                if(sibling !== entry){
                    sibling.classList.remove('your-active-class');
                }
            }
            entry.target.classList.add('your-active-class');
            // Remove active class from all anchors if found, then add to the one in viewport
            var navItems = document.querySelectorAll('a');
            navItems.forEach((navItem) => {
                if(navItem.classList.contains('menu__link--active')){
                    navItem.classList.remove('menu__link--active');
                }
            });

            if(activeId == activeNavItem.getAttribute('href').substring(1) ){
                activeNavItem.classList.add('menu__link--active');
            }
            
        }
        // if section is not fully visible, remove the active class from its related navItem
        else{
            let inactiveNavItems = document.querySelectorAll(`a[href]:not([href='#${activeId}'])`);
            inactiveNavItems.forEach((inactiveItem, index) => {
                if(inactiveNavItems[index].classList.contains('menu__link--active')){
                    inactiveNavItems[index].classList.remove('menu__link--active');
                }
            });
        }
      });
    //   The threshold here checks for 70% visibility to include the mobile view
    }, {threshold: 0.7});
    document.querySelectorAll('section').forEach(section => { observer.observe(section) });
}

// Scroll to anchor ID using scrollTO event
// This is done through css scroll-behavior: smooth;

// Scroll to section on link click
// done above as the href for all nav-links are the id for each section



