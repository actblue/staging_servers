unless typeof MochaWeb == 'undefined'
  MochaWeb.testOnly ->

    describe 'open create server dialog', ->
      beforeEach (done) ->
        Session.set 'showCreateServerDialog', true
        done()

      it 'should show the create server modal', ->
        Meteor.flush()
        chai.assert.equal $('.modal.create-sever-dialog').length, 1
