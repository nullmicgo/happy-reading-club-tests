Feature: Happy Reading Club Regression Tests
  As a user of Happy Reading Club
  I want to ensure the app launches correctly
  So that I can start reading

  Scenario: Verify app launches and shows welcome screen
    Given I launch the Happy Reading Club app
    When I wait for the welcome screen
    Then I should see the welcome message "Welcome to Happy Reading Club"