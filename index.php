<?php

use Kirby\Cms\App as Kirby;
use Kirby\Text\KirbyTag;

Kirby::plugin('hananils/tiptap-tags', [
    'tags' => [
        /**
         * Add definition for `_layout` attribute to default image KirbyTag
         * which holds the toggle state of the an image.
         */
        'image' => [
            'attr' => [...KirbyTag::$types['image']['attr'], '_layout'],
            'html' => KirbyTag::$types['image']['html']
        ]
    ]
]);
