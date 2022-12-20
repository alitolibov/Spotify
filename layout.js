const layout = (place) => {
    place.innerHTML = `
            <div class="left">
            <div class="left-top">
                <nav>
                    <div class="img-block">
                        <div class="img home"></div>
                        <p class="text active">Home</p>
                    </div>
                    <div class="img-block">
                        <div class="img search"></div>
                        <p class="text">Search</p>
                    </div>
                    <div class="img-block">
                        <div class="img books"></div>
                        <p class="text">Your Library</p>
                    </div>
                </nav>
            </div>
            <div class="left-center">
                <nav>
                <div class="img-block">
                        <div class="img create"></div>
                        <p class="text">Create Playlist</p>
                    </div>
                    <div class="img-block">
                        <div class="img liked"></div>
                        <p class="text active">Liked Songs</p>
                    </div>
                </nav>
            </div>
            <div class="left-bottom">
                <nav>
                    <div class="gap">
                    <a class='grey'>Chill Mix</a>
                    <a class='grey'>Insta Hits</a>
                    <a class='grey'>Your Top Songs 2021</a>
                    <a class='grey'>Mellow Songs</a>
                    <a class='grey'>Anime Lofi & Chillhop Music</a>
                    <a class='grey'>BG Afro “Select” Vibes</a>
                    <a class='grey'>Happy Hits!</a>
                    <a class='grey'>Deep Focus</a>
                    <a class='grey'>Instrumental Study</a>
                    <a class='grey'>OST Compilations</a>
                    <a class='grey'>Nostalgia for old souled mill...</a>
                    </div>
                </nav>
            </div>
        </div>
        <header>
               <div class="header-left">
                    <a><div class="back"></div></a>
                    <a><div class="next"></div></a>
               </div>
               <div class="header-right">
               
                <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
                <span class="sr-only">Open user menu</span>
                <img src="./public/images/dava.png" alt="" class="mr-2 w-8 h-8 rounded-full">
                davedirect3
                <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <!-- Dropdown menu -->
                <div id="dropdownAvatarName" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div class="font-medium ">Pro User</div>
                    <div class="truncate">name@flowbite.com</div>
                </div>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                <li>
                     <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                </ul>
                <div class="py-1">
                <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
                </div>

                </div>
               </header>
               <div class="right">
            <div class="right-top">
                <p class="text1">Friend Activity</p>
                <div class="nav-block">
                    <div class="chel"></div>
                    <div class="none"></div>
                </div>
            </div>
            <p class="info">Let friends and followers on Spotify see what you’re listening to.  </p>
            <div class="contacts">
                <div class="contact animate-pulse"></div>
                <div class="contact animate-pulse"></div>
                <div class="contact animate-pulse"></div>
            </div>
            <p class="info">Go to Settings Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
            <button class="settings">SETTINGS</button>
        </div>
        <footer>
            <div class="footer-left">
                <p class="musictitle">Play It Safe</p>
                <p class="musicartist">Julia Wolf</p>
            </div>
            <div class="footer-center">
                <div class="footer-center-top">
                    <div class="shuffle"></div>
                    <div class="center-back"></div>
                    <div class="pause"></div>
                    <div class="center-next"></div>
                    <div class="return"></div>
                    <audio src=""></audio>
                </div>
                <div class="footer-center-bottom"></div>
            </div>
            <div class="footer-right">
                <div class="xs"></div>
                <div class="kolonka"></div>
                <div class="volume"></div>
                <div class="crossbar"></div>
                <div class="big"></div>
            </div>
        </footer>
    `
}
 
export default layout;