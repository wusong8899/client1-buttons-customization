<?php

namespace wusong8899\Client1ButtonsCustomization\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

class ButtonsCustomization extends AbstractModel
{
    use ScopeVisibilityTrait;
    protected $table = 'wusong8899_buttons_custom';
}
