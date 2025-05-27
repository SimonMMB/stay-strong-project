@if ($paginator->hasPages())
    <nav class="flex justify-center items-center space-x-2">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <span class="px-3 py-1 rounded-lg bg-gray-200/50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed">&lsaquo;</span>
        @else
            <a href="{{ $paginator->previousPageUrl() }}" class="px-3 py-1 rounded-lg bg-orange-100/70 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 hover:bg-orange-200/70 dark:hover:bg-orange-800/60 transition-colors" rel="prev">&lsaquo;</a>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
            {{-- "Three Dots" Separator --}}
            @if (is_string($element))
                <span class="px-2 py-1 text-gray-500 dark:text-gray-400">{{ $element }}</span>
            @endif

            {{-- Array Of Links --}}
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <span class="px-3 py-1 rounded-lg bg-orange-500/80 dark:bg-orange-600 text-white font-medium">{{ $page }}</span>
                    @else
                        <a href="{{ $url }}" class="px-3 py-1 rounded-lg bg-white/70 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-colors">{{ $page }}</a>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" class="px-3 py-1 rounded-lg bg-orange-100/70 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 hover:bg-orange-200/70 dark:hover:bg-orange-800/60 transition-colors" rel="next">&rsaquo;</a>
        @else
            <span class="px-3 py-1 rounded-lg bg-gray-200/50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed">&rsaquo;</span>
        @endif
    </nav>
@endif