OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:options] = -> {
        opts = OpenSSL::SSL::OP_NO_SSLv3
        opts &= ~OpenSSL::SSL::OP_DONT_INSERT_EMPTY_FRAGMENTS
        opts |= OpenSSL::SSL::OP_NO_COMPRESSION
        opts
}.call
