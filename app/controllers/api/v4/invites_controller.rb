class Api::V4::InvitesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def accept
    invite = Invite.find(params[:id])
    render json: { accepted: invite.accept, room: invite.room, user: invite.user }
  end

  def reject
    invite = Invite.find(params[:id])
    render json: { accepted: invite.reject, room: invite.room, user: invite.user }
  end

  def show
    invite = Invite.find(params[:id])
    users = invite.room.users
    render json: { invite: Invite.find(params[:id]).with_all_attributes, users: users }
  end

  def create
    invite = Invite.new
    invite.attributes = invite_params
    render json: {created: invite.save, invite: invite.with_all_attributes}
  end

  def index
    render json: { invites: current_user.invites.where(status: 'sended') }
  end

  private

  def invite_params
    params.require(:invite).permit(:user_id, :room_id, :content)
  end
end
