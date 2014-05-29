<?php
    namespace Meerkat\Realplexor;
    use \Kohana;

    class Realplexor {
        static protected $instance = null;

        static public function instance() {
            if (is_null(self::$instance)) {
                require_once Kohana::find_file('vendor', 'Realplexor');
                self::$instance = new \Dklab_Realplexor(
                    Kohana::$config->load('meerkat/realplexor.host'),
                    Kohana::$config->load('meerkat/realplexor.port'),
                    Kohana::$config->load('meerkat/realplexor.namespace')
                );
            }
            return self::$instance;
        }
    }