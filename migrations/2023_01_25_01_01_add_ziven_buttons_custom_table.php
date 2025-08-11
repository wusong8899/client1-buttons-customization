<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('wusong8899_buttons_custom')) {
            $schema->create('wusong8899_buttons_custom', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 255);
                $table->string('icon', 50)->nullable();
                $table->string('color', 50)->nullable();
                $table->string('url', 500);
                $table->integer('sort')->unsigned()->default(0);

                $table->index('sort');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->drop('wusong8899_buttons_custom');
    },
];
