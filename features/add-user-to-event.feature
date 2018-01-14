#This is a feature written in Gherkin for cucumber tests
#
Feature: User can Sign Up to an Event
As a User 
I want to sign up to an Event
So that I can volunteer for that Event

Scenario: User Added to an Event
Given I have an Event
When I add a User to the Event
Then the user will be associated with the Event once

Scenario: User already Added to an Event
Given I have an Event where the User is already associated
When I add a User to the Event 
Then the user will be assicated with the Event once