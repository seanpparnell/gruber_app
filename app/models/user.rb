# frozen_string_literal: true

class User < ActiveRecord::Base

  has_many :services, dependent: :destroy

  # validates :fname, :lname, :phone, :role, :image, presence: true


  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end