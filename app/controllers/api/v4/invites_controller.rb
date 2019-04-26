class Api::V4::InvitesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def accept
    invite = Invite.find(params[:id])
    render json: { accepted: invite.accept, user: invite.user }
  end

  def create; end
end
