Portfolio — عبدالرحمن مصطفى

تم تجهيز الملفات في بنية مترابطة. افتح index.html من خلال خادم محلي حتى تعمل جميع الملفات والموارد.

هيكل الملفات:
- index.html
- assets/css/styles.css
- assets/css/swiper-bundle.min.css
- assets/js/main.js
- assets/js/scrollreveal.min.js
- assets/js/swiper-bundle.min.js
- assets/img/ (الصور والأيقونة)
- assets/pdf/Anid-Cv.pdf

تم وضع الصورة الشخصية المرفقة في:
- assets/img/home-perfil.png
- assets/img/about-perfil.png

التشغيل على Android / Termux:
1. فك ضغط المجلد بالكامل.
2. افتح Termux ونفّذ:
   pkg install python -y
   cd /sdcard/Download/Portfolio-Abdelrahman-Ready
   python -m http.server 8000
3. افتح Chrome على:
   http://127.0.0.1:8000

لا تنقل index.html وحده بعيداً عن مجلد assets. يتطلب تحميل Remix Icons وخطوط Google اتصالاً بالإنترنت.
