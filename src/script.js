/*******************IMPORTS********************/
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, pad } from '@cloudinary/url-gen/actions/resize';
import { name } from '@cloudinary/url-gen/actions/namedTransformation';
import { color, predominant } from '@cloudinary/url-gen/qualifiers/background';
import {
  colorize,
  artisticFilter,
  blackwhite,
  grayscale,
  enhance,
  negate,
  dither
} from '@cloudinary/url-gen/actions/effect';
import { halftone16x16Orthogonal } from '@cloudinary/url-gen/qualifiers/dither';
import {
  autoContrast,
  blue,
  red,
  green,
  hue,
  improve,
  brightness,
  contrast
} from '@cloudinary/url-gen/actions/adjust';

/*******************GLOBAL********************/
const d = document;
const $ = el => d.querySelector(el);
const $body = d.body;
const $line = $('.line');
let currentViewInformation = 0;
let deltaIsNegative = null;

const GROW_HEIGHT = 30;
let currentHeight = 500;
let actualHeight = 0;

const GROW_BOTTOM = 50;
let currentBottom = 0;
let actualBottom = 0;

const GROW_BG = 1;
let currentBg = 20;
let actualBg = 0;

let currentImage = 0;

let functionsCloudinaryUsed = [
  'image()',
  'resize()',
  'fill()',
  'width()',
  'height()',
  'format()',
  'avif()',
  'aspectRatio()',
  'delivery()',
  'defaultImage()'
];

const firstText =
  'image(),<br>resize(),<br>fill(),<br>width(),<br>height(),<br>format(),<br>avif(),<br>aspectRatio(),<br>delivery(),<br>defaultImage()';

let arrayTransformations = [];

let transformationsRandom = [
  'backgroundColor',
  'pad',
  'predominant',
  'colorize',
  'artisticFilter',
  'autoContrast',
  'blackwhite',
  'blue',
  'red',
  'green',
  'grayscale',
  'hue',
  'improve',
  'brightness',
  'contrast',
  'enhance',
  'negate',
  'dither'
];

/*******************CLOUDINARY********************/
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dbab7fco2'
  }
});

const patterns = [
  'n1_svvhoc',
  'n2_pgoeob',
  'n3_tzkspr',
  'n4_v5kb0a',
   'n5_uakvpr',
  'n6_lp3iox',
  'n7_ld4uew',
  'n8_lzsclb',
  'n9_q74eqm',
  'n10_tqus9z',
  'n11_iebjmm',
  'n12_gn8k2p',
  'n13_zhtiao',
  'n14_j10dxf',
  'n15_gpgdck',
  'n16_t8kwy9',
  'n17_nzioth',
  'n18_mm6q8r',
  'n19_ciiyhc',
  'n20_ai16p8',
  'n21_hafuyz',
  'n22_mgvkjj',
  'n23_qfljks',
  'n24_kfpzzr',
  'n25_v0vxam',
  'n26_abk5qi',
  'n27_g3shaf',
  'n28_buxxl0',
  'n29_gganti',
  'n30_ki6fdm',
  'n31_m52crr',
  'n32_bbxyub',
  'n33_vzklmf',
  'n34_tysltv',
  'n35_dlahvb',
  'n36_ddlu05',
  'n37_mf9vtk',
  'n38_qgpwlb',
  'n39_e18grt',
  'n40_ni6kf1',
  'n41_hkogzd',
  'n42_puuugb',
  'n43_ms9u8h',
  'n44_ytfnvw',
  'n45_zhmsfn',
  'n46_k6lmwc',
  'n47_mdzria',
  'n48_qimlgh',
  'n49_t3stwa',
  'n50_xspdke',
  'n51_mchmsp',
  'n52_eb9oom',
  'n53_lyfnxu',
  'n54_prvjjw',
  'n55_oxoswj',
  'n56_yuu1bx',
  'n57_dlxju0',
  'n58_qyvhuj',
  'n59_wegmys',
  'n60_rgbgdc',
  'n61_ndfgn4',
  'n62_utatck',
  'n63_dmg5lt',
  'n64_dubmdh',
  'n65_ij4kdr',
  'n66_qqnkwq',
  'n67_emurfp',
  'n68_ka8t97',
  'n69_aejqpy',
  'n70_uhlatm',
  'n71_ugsde5',
  'n72_lgn6rq',
  'n73_xicgnn',
  'n74_kr2sxe',
  'n75_emlais',
  'n76_ticblt',
  'n77_yufbw9',
  'n78_kvbxk1',
  'n79_puxexh',
  'n80_wvbxhv',
  'n81_wmhp83',
  'n82_egefec',
  'n83_l0tv4y',
  'n84_aeuycs',
  'n85_nidi6g',
  'n86_zueqnc',
  'n87_poinvc',
  'n88_slibup',
  'n89_h3f95n',
  'n90_auage5',
  'n91_pd3btw',
  'n92_etcck2',
  'n93_igjv0p',
  'n94_s5gdgc',
  'n95_h3i17k',
  'n96_wzmmyx',
  'n97_rswglr',
  'n98_hbaj6i',
  'n99_wtleut',
  'n100_k3nrr9',
  'n101_ic76zt'
];

const generateImagesOfCloudinary = (W_and_H, GrowWH) => {
  let array = [];

  for (let currentImage of patterns) {
    let arrayOfTransforms = generateArrayTransforms(3);
    W_and_H += GrowWH;

    const prevUrl = cld
      .image(currentImage)
      .resize(fill().width(W_and_H).height(W_and_H))
      .namedTransformation(name('formatAvif-and-defaultImg'));
    // .format(avif())
    //.delivery(defaultImage('n83_l0tv4y.avif'))

    let { newUrl: url, currentImageTransforms } = applyRespectiveTransforms(
      prevUrl,
      arrayOfTransforms
    );
    arrayTransformations.push(currentImageTransforms);
    array.push(url.toURL());
  }

  return array;
};

function generateArrayTransforms(numOfTransforms) {
  let { length } = transformationsRandom;
  let arrayTranformations = [];
  let arrayElement = null;
  for (let i = 0; i < numOfTransforms; i++) {
    do {
      let randomTransform = Math.floor(Math.random() * length);
      arrayElement = transformationsRandom[randomTransform];
    } while (arrayTranformations.includes(arrayElement));
    arrayTranformations.push(arrayElement);
  }

  return arrayTranformations; //Example: ['crop', 'rotate']
}

function applyRespectiveTransforms(url, arrayTransform) {
  const transforms = {
    backgroundColor: url => url.backgroundColor('#000'),
    pad: url => url.resize(pad().background(color('#000'))),
    predominant: url => url.resize(pad().background(predominant())),
    colorize: url => url.effect(colorize().level(50).color('#20a020')),
    artisticFilter: url => url.effect(artisticFilter('incognito')),
    autoContrast: url => url.adjust(autoContrast().blend(80)),
    blackwhite: url => url.effect(blackwhite()),
    blue: url => url.adjust(blue().level(90)),
    red: url => url.adjust(red().level(90)),
    green: url => url.adjust(green().level(90)),
    grayscale: url => url.effect(grayscale()),
    hue: url => url.adjust(hue().level(40)),
    /* url.adjust(improve().blend(50)) */
    improve: url => url,
    brightness: url => url.adjust(brightness().level(50)),
    contrast: url => url.adjust(contrast(500)),
    /* url.effect(enhance())*/
    enhance: url => url,
    negate: url => url.effect(negate()),
    dither: url => url.effect(dither().type(halftone16x16Orthogonal()))
  };

  let newUrl = arrayTransform.reduce(
    (url, transform) => transforms[transform](url),
    url
  );

  let arrayTransformWithParenthesis = arrayTransform.map(el => el.concat('()'));
  let valor = null;
  let arrayUnido = [
    ...arrayTransformWithParenthesis,
    ...functionsCloudinaryUsed
  ];

  let currentImageTransformsArray = [];

  let { length } = arrayUnido;

  for (let i = 0; i < length; i++) {
    do {
      let random = Math.floor(Math.random() * length);
      valor = arrayUnido[random];
    } while (currentImageTransformsArray.includes(valor));
    currentImageTransformsArray.push(valor);
  }

  let currentImageTransforms = currentImageTransformsArray.join(', <br>');

  return {
    newUrl,
    currentImageTransforms
  };
}

const arrayImages = generateImagesOfCloudinary(500, 20);

/*******************CURRENT FUNCTIONS********************/

const generateDinosaurio = PIXEL_ART => {
  const boxShadow = PIXEL_ART.map((pixel, index) => {
    const x = 0.3 * (index % 24);
    const y = 0.3 * ~~(index / 24);
    return `${x}vw ${y}vw ${COLORS[pixel]}`;
  }).join(',\n');

  $container.style.setProperty('--shadow', boxShadow);
};

const deleteCartel = () => {
  d.body.removeChild($('.information'));
};

let firstConditionExecuted = false;
function updateDataTable() {
  const $tableWithin = selector => $('.statistics').querySelector(selector);
  $tableWithin('.window-width').innerHTML = `${window.innerWidth}px`;
  $tableWithin('.window-height').innerHTML = `${window.innerHeight}px`;
  $tableWithin('.current-photo a').href = `${arrayImages[currentImage]}`;
  $tableWithin('.current-photo-id').innerHTML = `${patterns[currentImage]}`;
  let _width = arrayImages[currentImage]
    .match(/w_[0-9]+/gi)
    .join('')
    .slice(2);
  $tableWithin('.current-photo-width').innerHTML = `${_width}x${_width}`;
  $tableWithin('.used-transformations').innerHTML =
    !firstConditionExecuted && currentImage <= 0
      ? ((firstConditionExecuted = true), firstText)
      : arrayTransformations[currentImage];
}

updateDataTable();

window.deleteWorn = function () {
  document.body.removeChild($('.message'));
  document.body.removeChild($('.container-floor'));
  document.body.removeChild($('.container-letro-map'));
  $('.ground').classList.remove('hidden-ground');
  sessionStorage.setItem('cloudinary-introduction', 'saw');
};

/*******************SPIDER MOVE********************/

let isPaused = true;
let inactiviyTimeOut;
let INACTIVITY_TIME = 400;

const movilQuery = window.matchMedia('(max-width: 1000px)');

movilQuery.addEventListener('change', e => {
  if (e.matches) {
    INACTIVITY_TIME = 1300;
  }
});

function pauseAnimation() {
  if (!isPaused) {
    $('.spider-sprite').classList.remove('spider-moving');
    isPaused = true;
  }
}

const runSpider = () => {
  clearTimeout(inactiviyTimeOut);
  if (isPaused) {
    $('.spider-sprite').classList.add('spider-moving');
    isPaused = false;
  }
  inactiviyTimeOut = setTimeout(pauseAnimation, INACTIVITY_TIME);
};

/*******************DINOSAUR********************/

const COLORS = {
  0: 'transparent',
  1: '#535353',
  2: '#fff'
};
const $container = document.querySelector('.container-dinousario');

const scheme = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const base = [
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const righFoot = [
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const leftFoot = [
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const schemes = [base, leftFoot, righFoot];

const renderScheme = (a, b) => [...a, ...b];

let currentScheme = 0;
let PIXEL_ART = renderScheme(scheme, schemes[currentScheme]);
generateDinosaurio(PIXEL_ART);

setInterval(() => {
  PIXEL_ART = renderScheme(scheme, schemes[currentScheme]);
  generateDinosaurio(PIXEL_ART);
  if (currentScheme === 2) currentScheme = -1;
  currentScheme++;
}, 100);

/*******************EVENT DELEGATION DESTOP********************/
d.addEventListener('wheel', e => {
  if (currentViewInformation === 0) {
    deleteCartel();
    currentViewInformation++;
    $('.spider-sprite').classList.remove('spider-hidden');
  }

  runSpider();

  deltaIsNegative = e.deltaY < 0;

  deltaIsNegative
    ? (currentHeight += GROW_HEIGHT)
    : (currentHeight -= GROW_HEIGHT);
  if (currentHeight < 500) currentHeight = 500;
  actualHeight = Math.max(500, currentHeight);

  deltaIsNegative
    ? (currentBottom += GROW_BOTTOM)
    : (currentBottom -= GROW_BOTTOM);
  if (currentBottom < 0) currentBottom = 0;
  actualBottom = Math.max(0, currentBottom);

  deltaIsNegative ? (currentBg += GROW_BG) : (currentBg -= GROW_BG);
  if (currentBg < 20) currentBg = 20;
  actualBg = Math.max(20, currentBg);

  if (actualBg % 20 === 0 && actualBg !== 20) {
    if (!arrayImages[currentImage]) currentImage = 0;
    updateDataTable();
    $body.style.setProperty('--img', `url(${arrayImages[currentImage]})`);
    currentImage++;
  }
  if (actualBg > 100) currentBg = 20;

  $line.style.height = `${actualHeight}vh`;
  $line.style.bottom = `${actualBottom * -1}px`;
  $body.style.backgroundSize = `${actualBg}%`;
});

d.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (currentViewInformation === 0) {
      deleteCartel();
      currentViewInformation++;
      $('.spider-sprite').classList.remove('spider-hidden');
    }

    runSpider();
    deltaIsNegative = e.key === 'ArrowUp';

    deltaIsNegative
      ? (currentHeight += GROW_HEIGHT)
      : (currentHeight -= GROW_HEIGHT);
    if (currentHeight < 500) currentHeight = 500;
    actualHeight = Math.max(500, currentHeight);

    deltaIsNegative
      ? (currentBottom += GROW_BOTTOM)
      : (currentBottom -= GROW_BOTTOM);
    if (currentBottom < 0) currentBottom = 0;
    actualBottom = Math.max(0, currentBottom);

    deltaIsNegative ? (currentBg += GROW_BG) : (currentBg -= GROW_BG);
    if (currentBg < 20) currentBg = 20;
    actualBg = Math.max(20, currentBg);

    if (actualBg % 20 === 0 && actualBg !== 20) {
      if (!arrayImages[currentImage]) currentImage = 0;
      updateDataTable();
      $body.style.setProperty('--img', `url(${arrayImages[currentImage]})`);
      currentImage++;
    }

    if (actualBg > 100) currentBg = 20;

    $line.style.height = `${actualHeight}vh`;
    $line.style.bottom = `${actualBottom * -1}px`;
    $body.style.backgroundSize = `${actualBg}%`;
  }
});

/*******************EVENT DELEGATION MOBILE********************/

const start = e => {
  if (currentViewInformation === 0) {
    deleteCartel();
    currentViewInformation++;
    $('.spider-sprite').classList.remove('spider-hidden');
  }

  let deltaYinital = e.touches[0].clientY ?? e.pageY;

  const move = e => {
    let deltaYCurrent = e.touches[0].clientY ?? e.pageY;
    let deltaDistance = deltaYinital - deltaYCurrent;

    runSpider();

    deltaIsNegative = deltaDistance <= 0;

    deltaIsNegative
      ? (currentHeight += GROW_HEIGHT)
      : (currentHeight -= GROW_HEIGHT);
    if (currentHeight < 500) currentHeight = 500;
    actualHeight = Math.max(500, currentHeight);

    deltaIsNegative
      ? (currentBottom += GROW_BOTTOM)
      : (currentBottom -= GROW_BOTTOM);
    if (currentBottom < 0) currentBottom = 0;
    actualBottom = Math.max(0, currentBottom);

    deltaIsNegative ? (currentBg += GROW_BG) : (currentBg -= GROW_BG);
    if (currentBg < 20) currentBg = 20;
    actualBg = Math.max(20, currentBg);

    if (actualBg % 20 === 0 && actualBg !== 20) {
      if (!arrayImages[currentImage]) currentImage = 0;
      updateDataTable();
      $body.style.setProperty('--img', `url(${arrayImages[currentImage]})`);
      currentImage++;
    }

    if (actualBg > 100) currentBg = 20;

    $line.style.height = `${actualHeight}vh`;
    $line.style.bottom = `${actualBottom * -1}px`;
    $body.style.backgroundSize = `${actualBg}%`;
  };

  d.addEventListener('touchmove', move);

  const end = () => {
    d.removeEventListener('touchmove', move);
    d.removeEventListener('touchend', end);
  };

  d.addEventListener('touchend', end);
};

d.addEventListener('touchstart', start);
