<?php

declare(strict_types=1);

use PhpCsFixer\Fixer\FixerInterface;
use PhpCsFixer\FixerDefinition\{FixerDefinition, FixerDefinitionInterface};
use PhpCsFixer\Tokenizer\Tokens;
use Symfony\Component\Process\Process;

// Use Prettier as a PHP fixer
$prettier = new class () implements FixerInterface {
    public function fix(SplFileInfo $file, Tokens $tokens): void
    {
        if ($tokens->count() > 0 && $this->isCandidate($tokens) && $this->supports($file)) {
            $process = new Process([
                'npx',
                'prettier',
                '--config',
                __DIR__ . '/.prettierrc',
                $file,
            ]);
            $exitStatus = $process->run();

            if ($exitStatus !== 0) {
                throw new RuntimeException(
                    'Prettier error: ' . $process->getErrorOutput(),
                    $exitStatus,
                );
            }

            $tokens->setCode($process->getOutput());
        }
    }

    public function getDefinition(): FixerDefinitionInterface
    {
        return new FixerDefinition('Format code with Prettier', []);
    }

    public function getName(): string
    {
        return 'Prettier/php';
    }

    public function getPriority(): int
    {
        // Allow prettier to pre-process the code before php-cs-fixer
        return 999;
    }

    public function isCandidate(Tokens $tokens): bool
    {
        return true;
    }

    public function isRisky(): bool
    {
        return false;
    }

    public function supports(SplFileInfo $file): bool
    {
        return $file->getExtension() === 'php';
    }
};

return (new \PhpCsFixer\Config())
    ->registerCustomFixers([$prettier])
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR12' => true,
        '@PSR12:risky' => true,
        '@PHP81Migration' => true,
        '@PHP80Migration:risky' => true,
        '@PHPUnit84Migration:risky' => true,
        '@PhpCsFixer' => true, // includes Symfony
        '@PhpCsFixer:risky' => true, // includes Symfony:risky
        'Prettier/php' => true,

        // Let prettier fix operator spacing.
        'binary_operator_spaces' => false,
        'concat_space' => ['spacing' => 'one'],
        'group_import' => true,
        // Don't place closing semicolon on new line after chained method.
        'multiline_whitespace_before_semicolons' => false,
        'no_empty_comment' => false,
        'php_unit_internal_class' => false,
        'php_unit_method_casing' => false,
        'php_unit_test_class_requires_covers' => false,
        // Allow @throws tags to come last:
        'phpdoc_order' => false,
        'phpdoc_types_order' => ['null_adjustment' => 'always_last'],
        // Prevents import grouping:
        'single_import_per_statement' => false,
        'single_line_comment_style' => ['comment_types' => ['hash']],
        'yoda_style' => false,
    ])
    ->setFinder(
        PhpCsFixer\Finder::create()
            ->in([
                __DIR__ . '/app',
                __DIR__ . '/bootstrap',
                __DIR__ . '/config',
                __DIR__ . '/database',
                __DIR__ . '/lang',
                __DIR__ . '/routes',
                __DIR__ . '/tests',
            ])
            ->exclude(['storage', 'bootstrap/cache']),
    );
