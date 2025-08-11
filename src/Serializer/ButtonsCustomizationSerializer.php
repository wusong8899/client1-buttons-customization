<?php

namespace wusong8899\Client1ButtonsCustomization\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class ButtonsCustomizationSerializer extends AbstractSerializer
{
    protected $type = 'buttonsCustomizationList';

    protected function getDefaultAttributes($data)
    {
        $attributes = [
            'id' => $data->id,
            'name' => $data->name,
            'icon' => $data->icon,
            'color' => $data->color,
            'url' => $data->url,
            'sort' => $data->sort,
        ];

        return $attributes;
    }
}
