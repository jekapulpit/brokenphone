class Api::V4::InvitesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def accept
    invite = Invite.find(params[:id])
    render json: { accepted: invite.accept, room: invite.room,  }
  end

  def show
    invite = Invite.find(params[:id])
    users = invite.room.users
    render json: { invite: Invite.find(params[:id]).with_type, users: users }
  end

  def create
    invite = Invite.new
    invite.attributes = invite_params
    render json: {created: invite.save, invite: invite.with_type}
  end

  def index
    render json: { invites: current_user.invites.where(accepted: false) }
  end

  private

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
