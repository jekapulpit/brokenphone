OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:options] |= OpenSSL::SSL::OP_NO_COMPRESSION
OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:ciphers] = "TLSv1.2:!aNULL:!eNULL"
OpenSSL::SSL::SSLContext::DEFAULT_PARAMS[:ssl_version] ="TLSv1_2"
