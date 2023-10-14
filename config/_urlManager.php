<?php

use Sitemaped\Sitemap;

return [
    'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'showScriptName' => false,
    'rules' => [
        // Pages
        ['pattern' => 'about', 'route' => 'page/about'],
        ['pattern' => 'contact', 'route' => 'page/contact'],



    ]
];
